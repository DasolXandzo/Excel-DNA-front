import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import cl from './DialogWindow.module.css'
//import TreeComponent from '../TreeComponent';
//import TreeViewTable from '../TreeViewTable';
import ArrayTable from './ArrayTable';
import BigButton from './Buttons/BigButton.jsx';
import CancelButton from './Buttons/CancelButton';
import FormButton from './Buttons/FormButton';
import TextAreaBlock from './Inputs/TextAreaBlock.jsx';
import InputBlock from './Inputs/InputBlock.jsx';
import ModalWindow from './ModalWindow';
import emailjs from '@emailjs/browser';

export default function DialogWindow(props) {

  const [array,SetArray] = useState([]);
  const [modal, setVisible] = useState(false);
  const [successModal, setSuccessVisible] = useState(false);

  const form = useRef();

  useEffect(() => {
    // Получение параметра jsonString из URL
    console.log(props);
    const { jsonString } = queryString.parse(window.location.search);
    console.log(jsonString)

    if (jsonString) {
      // Преобразование JSON-строки в массив и установка состояния
      const formulasObjectsArray = JSON.parse(jsonString.replace(/\@/g, "#"));
      SetArray(formulasObjectsArray);
      console.log(formulasObjectsArray);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hmidc2d', 'template_9j2zojm', form.current, 'uy1EPLFB0xspq-3Kk')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };


// convert array to tree
//----------------------------------------------------------
  class Node {
    constructor(name, result, depth) {
      this.name = name;
      this.result = result;
      this.depth = depth;
      this.children = [];
    }
  }
  
  function buildTree(inputArray) {
    const root = new Node("Root", 0, -1);
    const stack = [root];
  
    for (const item of inputArray) {
      const node = new Node(item.name, item.result, item.depth);
  
      while (stack.length > 1 && stack[stack.length - 1].depth >= node.depth) {
        stack.pop();
      }
  
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }
  
    return root.children;
  }

  const inputArray = []
  for(var i=0; i<array.length; i++){
    inputArray.push({name: array[i].Name, result: array[i].Result, depth: array[i].Depth, children: []})
  }

  console.log(inputArray);

  const tree = buildTree(inputArray);

  console.log(tree);
//----------------------------------------------------------


  return (
    <>
      {props.windowType == "treePage" && (<div className={cl.treeFormBodyStyle}>

        <div className={cl.block}>
          {/*<div style={treeHedlineStyle}>Дерево функции</div>*/}
          {/*<TreeComponent data={array} />*/}
          <ArrayTable treeData={tree} />
          {/*<Tree tree={array} />*/}
        </div>

        <div className={cl.footer_block}>
          <div className={cl.block}>
            <div className={cl.hedlineStyle}>Выбранная формула:</div>
            <div>пока этого не будет</div>
          </div>
        </div>

      </div>)}
      
      {props.windowType == "errorFormPage" && (<div className={cl.errorFormBodyStyle}>

        <div className={cl.modalTitle}>СООБЩЕНИЕ ОБ ОШИБКЕ</div>

        <form ref={form} onSubmit={sendEmail}>

          <InputBlock post={{type: 'file', title: 'Фото ошибки', name: 'errorPhoto'}} />

          <TextAreaBlock post={{title: 'Описание ошибки', name: 'comment', cols: '40', rows: '2', placeholder: 'Опишите ошибку. Можете привести пример правильной работы или примеры формул, которые необходимо проверить.'}} />

          <FormButton type='submit' onClick={() => {setSuccessVisible(true)}}>ОТПРАВИТЬ ФОРМУ</FormButton>
          {successModal && <ModalWindow visible={successModal} setVisible={setSuccessVisible}><CancelButton onClick={() => setSuccessVisible(false)}></CancelButton><div className='title'>Сообщение отправлено и будет обработано в порядке очереди.</div></ModalWindow>}

        </form>

      </div>)}
    </>
  )
}
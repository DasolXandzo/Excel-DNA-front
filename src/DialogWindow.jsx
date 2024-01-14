import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import cl from './DialogWindow.module.css'
import TreeComponent from './TreeComponent';
import TreeViewTable from './TreeViewTable';
import ArrayTable from './ArrayTable';

export default function DialogWindow(props) {

  const [array,SetArray] = useState([]);

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
    <div className={cl.bodyStyle}>

      <div className={cl.block}>
        {/*<div style={treeHedlineStyle}>Дерево функции</div>*/}
        {/*<TreeComponent data={array} />*/}
        <ArrayTable treeData={tree} />
        {/*<Tree tree={array} />*/}
      </div>

      <div className={cl.footer_block}>
        <div className={cl.block}>
          <div className={cl.hedlineStyle}>Выбранная формула:</div>
          <div>{props.lettersFormula.replace(/\ /g, "+")}</div>
        </div>
      </div>

    </div>
  )
}
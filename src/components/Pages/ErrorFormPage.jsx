import React, { useState, useRef } from 'react';
import cl from './ErrorFormPage.module.css';
import CancelButton from '../Buttons/CancelButton';
import FormButton from '../Buttons/FormButton';
import TextAreaBlock from '../Inputs/TextAreaBlock.jsx';
import InputBlock from '../Inputs/InputBlock.jsx';
import ModalWindow from '../ModalWindow.jsx';
import emailjs from '@emailjs/browser';

export default function ErrorFormPage() {

  const [successModal, setSuccessVisible] = useState(false);

  const form = useRef();

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

  return (
    <div className={cl.errorFormBodyStyle}>

      <div className={cl.modalTitle}>СООБЩЕНИЕ ОБ ОШИБКЕ</div>

      <form ref={form} onSubmit={sendEmail}>

        <InputBlock post={{type: 'file', title: 'Фото ошибки', name: 'errorPhoto'}} />

        <TextAreaBlock post={{title: 'Описание ошибки', name: 'comment', cols: '40', rows: '2', placeholder: 'Опишите ошибку. Можете привести пример правильной работы или примеры формул, которые необходимо проверить.'}} />

        <FormButton type='submit' onClick={() => {setSuccessVisible(true)}}>ОТПРАВИТЬ ФОРМУ</FormButton>
        {successModal && <ModalWindow visible={successModal} setVisible={setSuccessVisible}><CancelButton onClick={() => setSuccessVisible(false)}></CancelButton><div className='title'>Сообщение отправлено и будет обработано в порядке очереди.</div></ModalWindow>}

      </form>

    </div>
  )
}
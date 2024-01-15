import React from 'react'
import cl from './ModalWindow.module.css'



export default function ModalWindow({children, visible, setVisible, setSuccessVisible}) {
  
  const rootClasses = [cl.ModalWindow]
  if(visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={cl.ModalWindowContent}>

        {children}

      </div>
    </div>
  )
}
import React from "react";
import cl from './FormButton.module.css';

const FormButton = function({children, ...props}){

    return(
        <button {...props} className={cl.buttonStyle}>

            {children}

        </button>
    )

}

export default FormButton;
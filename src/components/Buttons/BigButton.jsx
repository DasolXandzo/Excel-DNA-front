import React from "react";
import cl from './BigButton.module.css';

const BigButton = function({children, ...props}){

    return(
        <button {...props} className={cl.buttonStyle}>

            {children}

        </button>
    )

}

export default BigButton;
import React from "react";
import cl from './CancelButton.module.css';

const CancelButton = function({children, ...props}){

    return(
        <button {...props} className={cl.buttonStyle}>

            <img className={cl.cancelImage} src={require("../../images/cancelButton.png")} alt="cancel"/>

        </button>
    )

}

export default CancelButton;
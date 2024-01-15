import React from "react";
import cl from './InputBlock.module.css';

const InputBlock = function(props){

    return(
        <div>
            <div className={cl.title}>{props.post.title}</div>
            <input {...props} className={cl.inputField} type={props.post.type} name={props.post.name} placeholder={props.post.placeholder} maxlength={props.post.maxlength} / >
        </div>
    )

}

export default InputBlock;
import React from "react";
import cl from './TextAreaBlock.module.css';

const TextAreaBlock = function(props){

    return(
        <div>
            <div className={cl.title}>{props.post.title}</div>
            <textarea {...props} className={cl.textField} name={props.post.name} cols={props.post.cols} rows={props.post.rows} placeholder={props.post.placeholder} />
        </div>
    )

}

export default TextAreaBlock;
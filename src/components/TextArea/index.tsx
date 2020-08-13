import React, {TextareaHTMLAttributes} from 'react';
import './styles.css';

interface TextArea extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string,
    label: string,
    invalidate?: boolean,
    textInvalidate?: string,
}

const TextArea: React.FC<TextArea> = ({name, label, invalidate, textInvalidate, ...rest}) => {
    return(
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            {invalidate && <p className="input-validate">{textInvalidate}</p>}
            <textarea id={name} name={name} {...rest}/>
        </div>
    )
}

export default TextArea;
import React, {InputHTMLAttributes} from 'react';
import './styles.css';

interface Input extends InputHTMLAttributes<HTMLInputElement>{
    name: string,
    label: string,
    invalidate?: boolean,
    textInvalidate?: string,
}

const Input: React.FC<Input> = ({name, label, invalidate, textInvalidate, ...rest}) => {
    return(
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            {invalidate && <p className="input-validate">{textInvalidate}</p>}
            <input type="text" id={name} name={name} {...rest}/>
        </div>
    )
}

export default Input;
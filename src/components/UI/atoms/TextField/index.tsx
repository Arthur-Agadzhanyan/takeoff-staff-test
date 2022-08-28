import { InputHTMLAttributes, memo } from 'react'
import styles from './input.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    labelText?: string,
}

function TextField(props:Props) {
    const {className='',labelText=''} = props
    let inputProps = {...props}
    delete inputProps.labelText
    
    return (
        <div>
            {labelText && <label className="textfield_label">{labelText}</label>}
            <input {...Object.assign({...inputProps},{className:`${styles.input} ${className}`})}/>
        </div>
        
    )
}

export default memo(TextField)

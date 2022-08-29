import { ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

function Button(props: Props) {

    return (
        <button {...Object.assign({...props},{className:`${styles.button} ${props.className}`})}>
            {props.children}
        </button>
    )
}

export default Button

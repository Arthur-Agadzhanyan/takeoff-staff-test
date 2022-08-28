import React, { ChangeEvent, useState } from 'react'
import TextField from "@atoms/TextField"
import styles from "@styles/auth-page.module.scss"

import Button from '@/components/UI/atoms/Button'
import { Link } from "react-router-dom"
import AuthPageTemplate from '@/components/templates/AuthPageTemplate'
import { useAppDispatch } from '@/app/hooks/redux-hooks'
import { auth } from '@/app/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '@/features/auth/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props { }

interface formValues {
    email: string,
    password: string
}

const initialValues: formValues = {
    email: '',
    password: ""
}

function LoginPage(props: Props) {
    const dispatch = useAppDispatch()
    const [formValues,setFormValues] = useState(initialValues)

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
            }).catch(()=>{
                toast.error('Неправильная почта или пароль', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })

            
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setFormValues(prev=>({...prev, [`${e.target.name}`]: e.target.value}))
    }

    return (
        <>
        <AuthPageTemplate title={"Вход"} withGoogleAuth>


            <form onSubmit={submitHandler}>
                <TextField type="email" name='email' labelText='Почта' className={styles.content__input} value={formValues.email} onChange={changeHandler} required/>
                <TextField type="password" name='password' labelText='Пароль' minLength={6} className={styles.content__input} value={formValues.password} onChange={changeHandler} required/>
                <Button className={styles.content__button}>Войти в аккаунт</Button>
            </form>

            <p className={styles.content__link}>Нет аккаунта? <Link to={'/register'}>Зарегистрироваться</Link></p>
            
        </AuthPageTemplate>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default LoginPage
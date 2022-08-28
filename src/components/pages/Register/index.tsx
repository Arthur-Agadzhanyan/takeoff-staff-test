import React, { ChangeEvent, useState } from 'react'
import TextField from "@atoms/TextField"
import Button from '@/components/UI/atoms/Button'
import { Link } from "react-router-dom"
import AuthPageTemplate from '@/components/templates/AuthPageTemplate'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { setUser } from '@/features/auth/userSlice'
import { useAppDispatch } from '@/app/hooks/redux-hooks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "@styles/auth-page.module.scss"

interface Props { }

interface formValues {
    email: string,
    password: string
}

function RegisterPage(props: Props) {
    const dispatch = useAppDispatch()
    const [formValues,setFormValues] = useState<formValues>({
        email:"",
        password:""
    })

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
            }).catch(()=>{
                toast.error('Пользователь с данной почтой уже существует', {
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
            <AuthPageTemplate title={"Регистрация"}>

                <form onSubmit={submitHandler}>
                    <TextField type="email" name='email' labelText='Почта' className={styles.content__input} value={formValues.email}  onChange={changeHandler} required />
                    <TextField type="password" name='password' labelText='Пароль' minLength={6} className={styles.content__input} value={formValues.password}  onChange={changeHandler} required />
                    <Button className={styles.content__button}>Создать аккаунт</Button>
                </form>

                <p className={styles.content__link}>Уже есть аккаунт? <Link to={'/login'}>Войти</Link></p>

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

export default RegisterPage

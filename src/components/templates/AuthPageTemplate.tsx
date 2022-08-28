import React from 'react'
import BaloonImage from "@assets/auth-page/baloon.png"
import styles from "@styles/auth-page.module.scss"
import GoogleIcon from "@assets/icons/google.png"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { useAppDispatch } from '@/app/hooks/redux-hooks'
import { setUser } from '@/features/auth/userSlice'

interface Props {
    children: React.ReactNode,
    title: string,
    withGoogleAuth?: boolean
}

function AuthPageTemplate({ children, title, withGoogleAuth = false }: Props) {
    const dispatch = useAppDispatch()
    const googleLogin = async ()=>{
        const provider =  new GoogleAuthProvider()
        signInWithPopup(auth,provider)
            .then(({user})=>{
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
            })
    }
    
    return (
        <div className={styles.login}>
            <div className={styles.login__baloon}>
                <img src={BaloonImage} alt="" />
            </div>
            <div className={styles.login__form}>
                <div className={styles.form__content}>
                    <h1 className={styles.content__title}>{title}</h1>
                    {children}

                    {
                        withGoogleAuth && (
                            <div className={styles.content__alternative}>
                                <p className={styles.alternative__title}>- ИЛИ -</p>
                                <button className='google_btn' onClick={googleLogin}>
                                    <img src={GoogleIcon} alt="" width={50} />
                                    <span>Войти с помощью Google</span>
                                </button>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default AuthPageTemplate

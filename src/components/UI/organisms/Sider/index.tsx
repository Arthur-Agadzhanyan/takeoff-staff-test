import { auth } from '@/app/firebase'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux-hooks'
import { setUser } from '@/features/auth/userSlice'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../atoms/Button'
import styles from "./sider.module.scss"

interface Props {}

function Sider(props: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.user)
    const navigate = useNavigate()

    const logout = ()=>{
        signOut(auth).then(()=>{
            dispatch(setUser({
                email: null,
                id: null,
                token: null
            }))
            navigate('/login',{replace:true})
        })
    }

    return (
        <div className={styles.sider}>
            <div className={styles.sider__top}>
                <h1>Пользователь</h1>
                <h2 className={styles.sider__user}>{user.email}</h2>
            </div>
            <div className={styles.sider__bottom}>
                <Button onClick={logout}>Выход</Button>
            </div>
        </div>
    )
}

export default Sider

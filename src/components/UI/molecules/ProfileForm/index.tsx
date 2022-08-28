import { FormValues } from '@/components/pages/Profile'
import React, { ChangeEvent, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import Button from '../../atoms/Button'
import TextField from '../../atoms/TextField'

import styles from './profile-form.module.scss'

interface Props {
    addContact: (e: React.FormEvent<HTMLFormElement>) => (formValues:FormValues,setFormValues: React.Dispatch<React.SetStateAction<FormValues>>)=>void
}

function ProfileForm({addContact}: Props) {
    const [formValues,setFormValues] = useState({
        name: "",
        phone:""
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setFormValues(prev=>({...prev, [`${e.target.name}`]: e.target.value}))
    }

    

    return (
        <form onSubmit={(e)=>addContact(e)(formValues,setFormValues)} className={styles.profile_form}>
            <TextField name="name" className={styles.profile_form__name} placeholder='Введите имя контакта' labelText='Имя контакта' value={formValues.name} onChange={changeHandler} maxLength={50} />
            <label className="textfield_label">Номер телефона</label>
            <PhoneInput
                international
                placeholder="Введите номер телефона контакта"
                value={formValues.phone}
                name="phone"
                onChange={(value) => {

                    if (typeof value === "undefined" || !value!.trim()) {
                        return ""
                    }
                    setFormValues(prev => ({ ...prev, phone: value!.toString() }))
                }}
                limitMaxLength={true}
                className={styles.profile_form__phone_input}

            />
            <Button>Добавить контакт</Button>
        </form>
    )
}

export default ProfileForm

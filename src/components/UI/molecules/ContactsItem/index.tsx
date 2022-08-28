import React, { ChangeEvent, memo, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import TextField from '@atoms/TextField'
import { Contact } from '@/components/pages/Profile'

import styles from './contacts-item.module.scss'

interface Props {
    item: Contact
    changeContact: (id:string,changedItem: Contact)=>Promise<void>
    deleteContact: (id:string)=>{}
}

function ContactsItem({item,changeContact,deleteContact}: Props) {
    const [isChanging,setIsChanging] = useState(false)
    const [changingForm, setChangingForm] = useState({
        name: item.name,
        phone: item.phone
    })

    const changingContact = ()=>{
        setIsChanging(prev=>!prev)
        setChangingForm({
            name: item.name,
            phone: item.phone
        })
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setChangingForm(prev=>({...prev, [`${e.target.name}`]: e.target.value}))
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {name,phone} = changingForm
        if(!name.trim() || !phone.trim()){
            return changingContact()
        }

        return changeContact(item.id,{...item,name,phone})
    }

    const renderContact = ()=>{
        if(isChanging){
            return (
                <form className={`${styles.contacts_item} ${styles.contacts_form}`} onSubmit={submitHandler}>
                    <div className={styles.contacts_item__info}>
                        <TextField name='name' value={changingForm.name} onChange={changeHandler} placeholder='Введите имя контакта'/>
                        
                        <PhoneInput
                            international
                            placeholder="Введите номер"
                            value={changingForm.phone}
                            name="phone"
                            onChange={(value)=>{
                                
                                if(typeof value === "undefined" || !value!.trim()){
                                    return ""
                                }
                                setChangingForm(prev=>({...prev,phone: value!.toString()}))
                            }}
                            limitMaxLength={true}
                            className={styles.contacts_item__phone_input}
                        />
                    </div>
                    <div className={styles.contacts_controls}>
                        <button>сохранить</button>
                        <button type='button' onClick={changingContact}>отменить</button>
                    </div>
                    
                </form>
            )
        }

        return (
            <div className={styles.contacts_item}>
                <div className={styles.contacts_item__info}>
                    <p className={styles.info__name}>{item.name}</p>
                    <p className={styles.info__phone}>{item.phone}</p>
                </div>
                <div className={styles.contacts_controls}>
                    <button onClick={changingContact}>изменить</button>
                    <button onClick={()=>deleteContact(item.id)}>удалить</button>
                </div>
            </div>
        )
    }

    return (
        <>
           {renderContact()}
        </>
    )
}

export default memo(ContactsItem)

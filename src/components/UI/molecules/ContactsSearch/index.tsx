import React, { ChangeEvent, memo, useState } from 'react'
import Button from '@atoms/Button'
import TextField from '@atoms/TextField'

import styles from './contacts-search.module.scss'

interface Props {
    searchContacts: (str:string)=>{}
}

function ContactsSearch({searchContacts}: Props) {
    const [searchValue,setSearchValue] = useState("")

    const submitHandler = (e:React.FormEvent)=>{
        e.preventDefault()
        searchContacts(searchValue)
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setSearchValue(e.target.value)
    }

    const clearSearch = ()=>{
        searchContacts("")
        setSearchValue("")
    }
    
    return (
        <form className={styles.contacts_search} onSubmit={submitHandler}>
            <TextField labelText='Поиск по имени' placeholder='Введите имя контакта' value={searchValue} onChange={changeHandler}/>
            <Button>Поиск</Button>
            <button type='button' className={styles.contacts_search__clear} onClick={clearSearch}>Очистить поиск</button>
        </form>
    )
}

export default memo(ContactsSearch)

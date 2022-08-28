import { Contact } from '@/components/pages/Profile'
import React, { memo } from 'react'
import Loader from '@atoms/Loader'
import ContactsItem from '@molecules/ContactsItem'
import EmptyContacts from '@molecules/EmptyContacts'

import styles from './contacts-list.module.scss'

interface Props {
    contacts: Contact[],
    loading: boolean,
    changeContact: (id: string, changedItem: Contact) => Promise<void>,
    deleteContact: (id: string) => {}
}

function ContactsList({ contacts, loading, changeContact, deleteContact }: Props) {


    return (
        <div className={styles.contacts_list}>
            
            {contacts && !loading && contacts!.map((item: Contact, i: number) => {
                return (
                    <ContactsItem
                        key={item.id}
                        item={item}
                        changeContact={changeContact}
                        deleteContact={deleteContact}
                    />
                )
            })}
        </div>
    )
}

export default memo(ContactsList)

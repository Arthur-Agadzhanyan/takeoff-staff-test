import React from 'react'
import BlackHoleIcon from '@assets/icons/black_hole.png'

import styles from "./empty-contacts.module.scss"

function EmptyContacts() {

    return (
        <div className={styles.empty_contacts}>
            <img src={BlackHoleIcon} alt="" className={styles.empty_contacts__black_hole} />
            <h1 className={styles.empty_contacts__title}>Список контактов пуст</h1>
        </div>
    )
}

export default EmptyContacts

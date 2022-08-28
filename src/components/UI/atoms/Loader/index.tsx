import React from 'react'
import styles from './loader.module.scss'

interface Props { }

function Loader(props: Props) {
    return (
        <div className={styles.loader}>
            <div className={styles.wrapper}>
                <span className={styles.dot}></span>
                <div className={styles.dots}>
                    <span className={styles.dots_item}></span>
                    <span className={styles.dots_item}></span>
                    <span className={styles.dots_item}></span>
                </div>
            </div>
        </div>
    )
}

export default Loader

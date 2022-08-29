import React from 'react'
import Sider from '@organisms/Sider'
import Layout from '@atoms/Layout'

import styles from './profile-content.module.scss'

interface Props {
    children: React.ReactNode
}

function ProfileContent({children}: Props) {
    return (
        <div className={styles.profile_content}>
            <Sider/>
            <Layout>
                {children}
            </Layout>
        </div>
    )
}

export default ProfileContent

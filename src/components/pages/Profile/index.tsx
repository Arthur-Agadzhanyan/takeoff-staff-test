import  { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { uuidv4 } from '@firebase/util'
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from '@features/auth/userSlice'
import { useAppDispatch, useAppSelector } from '@app/hooks/redux-hooks'
import { auth, firestore } from '@app/firebase'
import { useAuth } from '@app/hooks/use-auth'

import ProfileContent from '@organisms/ProfileContent'
import ContactsList from '@organisms/ContactsList'

import EmptyContacts from '@molecules/EmptyContacts'
import ProfileForm from '@molecules/ProfileForm'
import ContactsSearch from '@molecules/ContactsSearch'

import Button from '@atoms/Button'
import Loader from '@atoms/Loader'

import 'react-toastify/dist/ReactToastify.css';
import styles from '@styles/profile-page.module.scss'

export interface Contact {
    id: string,
    name: string,
    phone: string
}

export interface FormValues{
    name:string,
    phone:string
}

function ProfilePage() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.user)
    const {isAuth} = useAuth() 
    const [contacts,setContacts] = useState<Contact[]>([])
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const [docRef] = useState(doc(firestore, "contacts", user.id as string))

    const getContacts = useCallback(async () => {
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){   
            const data = await docSnap.data()
            setContacts(data.contacts)
        }else{
            await setDoc(doc(firestore, "contacts", `${user.id}`), {
                contacts: []
            });
        }
    },[docRef,user.id])

    useEffect(() => {
        if(isAuth){
            setLoading(true)
            getContacts()
                .then(()=>setLoading(false))
        }
    }, [isAuth,getContacts])

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
    
    const addContact = (e:React.FormEvent<HTMLFormElement>)=> async (formValues:FormValues,setFormValues: React.Dispatch<React.SetStateAction<FormValues>>)=>{
        e.preventDefault()
        if (!formValues.name.trim() || !formValues.phone.trim()) {
            return toast.error('Поля "имя контакта" и "номер телефона" не должны быть пустыми', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if (contacts) {
            setLoading(true)
            setFormValues({
                name: "",
                phone: ""
            })
            await updateDoc(docRef, {
                contacts: [{
                    id: uuidv4(),
                    name: formValues.name,
                    phone: formValues.phone,
                }, ...contacts]
            }).then(() => {
                getContacts().then(() => {
                    setLoading(false)
                })
            })
        }
    }

    const changeContact = async (id:string, changedItem: Contact)=>{
        if(contacts){
            setLoading(true)
            await updateDoc(docRef, {
                contacts: contacts.map((item:Contact)=>{
                    if(item.id === id){
                        return changedItem
                    }
                    return item
                })
            }).then(()=>{
                getContacts().then(()=>{
                    setLoading(false)
                })
            })
        } 
    }

    const deleteContact = async (id:string)=>{
        if(contacts){
            setLoading(true)
            await updateDoc(docRef, {
                contacts: contacts!.filter((item:Contact)=>item.id !== id)
            }).then(()=>{
                getContacts().then(()=>{
                    setLoading(false)
                })
            })
        }
    }

    const searchContacts = async (filterValue: string)=>{
        const docSnap = await getDoc(docRef)
        setLoading(true)
        if(docSnap.exists() && filterValue){   
            const data = await docSnap.data()
            let reg = new RegExp(filterValue+'.+$', 'i');
            
            const newData = data.contacts.filter((item:Contact)=>{
                return item.name.search(reg) !== -1;
            });
            
            setContacts(newData)
        }
        if(!filterValue){
            getContacts()
        }
        setLoading(false)
    }

    return (
        <>
            <ProfileContent>
                <div className={styles.profile_page}>
                    <h1 className='page_title'>Список контактов</h1>

                    <ProfileForm addContact={addContact}/>

                    
                    <ContactsSearch searchContacts={searchContacts}/>
                    
                    {loading && <Loader />}
                    {!loading && !contacts.length && <EmptyContacts />}
                    <ContactsList contacts={contacts} loading={loading} changeContact={changeContact} deleteContact={deleteContact}/>
                    
                </div>
                <Button className={styles.profile_page__mobile_exit} onClick={logout}>Выйти</Button>
            </ProfileContent>

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

export default ProfilePage

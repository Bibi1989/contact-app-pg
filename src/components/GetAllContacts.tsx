import React, { useEffect, useState } from 'react'
import Contacts from './GetContactComponent'
import { useHistory } from 'react-router'
import auth from '../PrivateRoute/Auth'
import SingleContact from './SingleContact'
import EditModal from './EditModal'

const GetAllContacts = () => {
    const path = window.location.href.replace(/[^0-9]/gi, '')
    // const routePath = useHistory()

    const [response, setResponse] = useState()
    const [contact, setContact] = useState()
    const [show, setShow] = useState(false)
    const [singleContact, setSingleContact] = useState()
    const [current, setCurrent] = useState(false)
    const token: string | null = sessionStorage.getItem("tok")
    const routePath = useHistory()
    useEffect(() => {
        fetch('/api/get', {
            headers: {
                "auth": `${token}`
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(response => {
            if(token) {
                setResponse(response.data)
            }else {
                auth.logout(() => {
                    routePath.push("/login")
                })
            }
        })
    }, [])

    const handleViewContact = (id: string) => {
        fetch(`/api/get/${id}`, {
            headers: {
                "auth": `${token}`
            },
            method: "GET"       
        })
        .then(res => res.json())
        .then(data => {
            setContact(data)
            setShow(true)
        })
    }

    const handleDelete = (id: string) => {
        fetch(`/api/delete/${id}`, {
            headers: {
                "auth": `${token}`
            },
            method: "DELETE"       
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(data => {
            // routePath.push("/contacts")
            window.location.href = `http://localhost:${path}/contacts`
        })
    }

    const handleEdit = (id: string) => {
        fetch(`/api/get/${id}`, {
            headers: {
                "auth": `${token}`
            },
            method: "GET"       
        })
        .then(res => res.json())
        .then(data => setSingleContact(data))
        .then(data => {
            setCurrent(true)
            routePath.push("/contacts")
            // window.location.href = `http://localhost:${path}/contacts`
        })    
    }

    return (
        <div style={{display: `grid`, gridTemplateColumns: `repeat(2, 1fr)`}}>
            <Contacts response={response} handleViewContact={handleViewContact} handleDelete={handleDelete} handleEdit={handleEdit} />
            <SingleContact contact={contact} show={show} />
            {current && <EditModal singleContact={singleContact} current={current} setCurrent={setCurrent} />}
        </div>
    )
}

export default GetAllContacts

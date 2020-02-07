import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const Modal: React.FC<{singleContact: any, current: boolean, setCurrent: any}> = ({singleContact, current, setCurrent}) => {
    const path = window.location.href.replace(/[^0-9]/gi, '')
    const token: string | null = sessionStorage.getItem("tok")
    // input fields
    const {first_name, last_name, phone, email, company, id} = singleContact || singleContact === undefined
    const had = (e: any) => {
        setFirst(e.target.value)
    }
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [ph, setPhone] = useState('')
    const [em, setEmail] = useState('')
    const [web, setWeb] = useState('')
    const [ids, setId] = useState('')

    const routePath = useHistory()
    
    useEffect(() => {
        setFirst(first_name)
        setLast(last_name)
        setPhone(phone)
        setEmail(email)
        setWeb(company)
        setId(id)
    }, [first_name,last_name,phone,email,company,id])

    const putData = (e: any) => {
        e.preventDefault()
        const collectData = {
            first_name: first,
            last_name: last,
            phone: ph,
            email: em,
            company: web
        }
        fetch(`/api/update/${ids}`, {
            method: "PATCH",
            headers: {
                "auth": `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(collectData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .then(() => {
            routePath.push("/contacts")
            window.location.href = `http://localhost:${path}/contacts`
        })
        .catch(err => console.log(err))
    }

    const handleCancel = (e: any) => {
        e.preventDefault()
        setCurrent(false)
    }
    
    return (
        <Parent>
            <div className="form" style={current ? {display: `block`} : {display: `none`}}>
                <h1>Update Contacts</h1>
                <form>
                    <div>
                        <input value={first} type="text" name="first_name" placeholder="First Name..." onChange={had} />
                    </div>
                    <div>
                        <input value={last} type="text" name="last_name" placeholder="Last Name..." onChange={(e) => setLast(e.target.value)} />
                    </div>
                    <div>
                        <input value={ph} type="text" name="phone" placeholder="Phone Number..." onChange={(e) => setPhone(e.target.value)}  />
                    </div>
                    <div>
                        <input value={em} type="text" name="email" placeholder="Email Address..." onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input value={web} type="text" name="company" placeholder="Website..." onChange={(e) => setWeb(e.target.value)} />
                    </div>
                    <div style={{display: "flex"}}>
                        <button type="submit" onClick={putData} style={{outline: "none", cursor: "pointer", marginRight: "20px"}}>Update Contact</button>
                        <button type="submit" style={{display: "block", outline: "none", cursor: "pointer"}} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </Parent>
    )
}

export default Modal

const Parent = styled.div`
    width: 60%;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: white;
    left: 35%;
    top: 50%;
    transform: translate(0%, -50%);
    border-radius: 10px;
    /* box-shadow: 0px 2px 7px #999; */
    padding: 20px;
    h1{
        text-align: center;
    }
    .form{
        width: 100%;
        input{
            width: 100%;
            padding: 10px;
            margin: 15px 0;
            border: 1px solid teal;
            opacity: 0.5;
        }
        button{
            padding: 10px 20px;
            border: none;
            margin: 10px 0;
            background: teal;
            color: #eee;
            border-radius: 5px;
        }
    }
`
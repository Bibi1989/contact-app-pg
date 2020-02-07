import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import auth from '../PrivateRoute/Auth'
import mob from '../mobile.svg'

interface Contacts {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
}

const PostContact = () => {
    const routePath = useHistory()

    const firstname:any = useRef('')
    const lastname:any = useRef('')
    const email:any = useRef('')
    const phone:any = useRef('')
    const company:any = useRef('')
    const [response, setResponse] = useState()

    const token: string | null = sessionStorage.getItem("tok")

    useEffect(() => {
        if(token) {
            return
        }else {
            auth.logout(() => {
                routePath.push("/login")
            })
        }
    })
    
    function fetchData(e: any) {
        e.preventDefault()
        const post: Contacts = {
            first_name: firstname.current.value,
            last_name: lastname.current.value,
            email: email.current.value,
            phone: phone.current.value,
            company: company.current.value
        }
        fetch(`/api/post`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth': `${token}`
            },
            body: JSON.stringify(post)
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
        .then(() => {
            routePath.push('/contacts')
        })
        
    }
    console.log(response)
    return (
        <div style={{display: `grid`, gridTemplateColumns: `repeat(2, 1fr)`}}>
            <Form>
                <div>
                    <h2 className="ui icon center aligned header">
                        <i aria-hidden="true" className="users circular icon"></i>
                        <div className="content">Add Contacts</div>
                    </h2>
                </div>
                <div>
                    <input type="text" ref={firstname} name="first_name" placeholder="First Name"  />
                </div>
                <div>
                    <input type="text" ref={lastname} name="last_name" placeholder="Last Name" />
                </div>
                <div>
                    <input type="text" ref={email} name="email" placeholder="Email Address"  />
                </div>
                <div>
                    <input type="text" ref={phone} name="phone" placeholder="Phone"  />
                </div>
                <div>
                    <input type="text" ref={company} name="company" placeholder="Company" />
                </div>
                <Button type='submit' style={{display: `block`, background: `#6C63FF`, color: `#eee`, margin: `auto`}} onClick={fetchData}>Add Contact</Button>
            </Form>
            <div style={{background: `url(${mob}) no-repeat center/contain`, padding: `3% 10px`}}></div>
        </div>
    )
}

export default PostContact

const Form = styled.form`

    div{
        margin: 20px 0;
        padding: 0 5%;
        input{
            padding: 10px;
            border: 9px solid #6C63FF;
            border-radius: 10px;
            width: 100%;
        }
    }
`

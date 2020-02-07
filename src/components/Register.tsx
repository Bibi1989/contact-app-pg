import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { RegisterForm } from './RegisterComponents'
import auth from '../PrivateRoute/Auth'

const Register = () => {
    // const path = window.location.href.replace(/[^0-9]/gi, '')
    const routePath = useHistory()
    const [username, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [response, setResponse] = useState()
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState({
        username: false,
        email: false,
        pass: false
    })

    const registerUser = (e: any) => {
        e.preventDefault()
        if(username === '') {
            return setEmpty({
                username: true,
                email: false,
                pass: false,
            })
        }else if(email === '') {
            return setEmpty({
                username: false,
                email: true,
                pass: false,
            })
        }else if(pass === '') {
            return setEmpty({
                username: false,
                email: false,
                pass: true,
            })
        }
        const user = {
            username,
            email,
            password: pass
        }
        fetch(`/users/register`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.status === 404){
                return
            }else if(res.status === 200) {
                return res.json()
            }
        })
        .then(response => {
            setResponse(response.data)
            sessionStorage.setItem("tok", response.token)
        }).then(() => {
            if(sessionStorage.getItem('tok')) {
                auth.login(() => {
                    routePath.push("/contacts")
                })
            }else{
                auth.logout(() => {
                    routePath.push("/login")
                })
            }
        })
        .catch(e => setError(true))
    }
    return (
        <div>
            <RegisterForm 
                setUser={setUser} 
                setEmail={setEmail} 
                setPass={setPass} 
                registerUser={registerUser} 
                response={response}
                empty={empty} 
                error={error} 
            />
        </div>
    )
}

export default Register

import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { LoginForm } from './LoginComponents'
import auth from '../PrivateRoute/Auth'

const Login = () => {
    // const path = window.location.href.replace(/[^0-9]/gi, '')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [response, setResponse] = useState()
    const [token, setToken] = useState("")
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState({
        email: false,
        pass: false
    })

    const routePath = useHistory()
    
    const h3: any = useRef()

    const loginUser = (e: any) => {
        e.preventDefault()
        if(email === '') {
            return setEmpty({
                email: true,
                pass: false
            })
        }else if(pass === '') {
            return setEmpty({
                email: false,
                pass: true
            })
        }
        if(email) {
            setEmpty({
                email: false,
                pass: false
            })
        }else if(pass) {
            setEmpty({
                email: false,
                pass: false
            })
        }
        const user = {
            email,
            password: pass
        }
        fetch(`/users/login`, {
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
            localStorage.setItem("username", `${response.data.username}`)
        })
        .then(() => {
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
        .catch(() => setError(true))
    }

    return (
        <div>
            <LoginForm 
                setEmail={setEmail} 
                setPass={setPass} 
                loginUser={loginUser} 
                error={error} 
                empty={empty} 
            />
        </div>
    )
}

export default Login

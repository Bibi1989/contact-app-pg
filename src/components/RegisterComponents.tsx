import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import mob from '../mob.svg'

export const RegisterForm: React.FC<{setUser: any, 
                                    setEmail: any, 
                                    setPass: any, 
                                    registerUser: any, 
                                    response: any,
                                    empty: any
                                    error: boolean
                                }
                            > = ({setUser, setEmail, setPass, registerUser, response, empty, error}) => {
    return (
        <div style={{display: `grid`, gridTemplateColumns: `repeat(2, 1fr)`, height: `75vh`, padding: `5%`}}>
            <Form method="post" style={{padding: `3% 5%`}}>
                <div>
                    <h2 className="ui icon center aligned header">
                        <i aria-hidden="true" className="users circular icon"></i>
                        <div className="content">Register</div>
                    </h2>
                </div>
                <Form.Field style={{margin: `7% 0%`}}>
                    <input type="text" name="username" placeholder="Username..." onChange={(e) => setUser(e.target.value)} />
                    {empty.username && <p style={{color: `red`, paddingTop: `10px`}}>* Username field is empty</p>}
                    {error && <p style={{color: `red`, paddingTop: `10px`}}>* Wrong email or password</p>}
                </Form.Field>
                <Form.Field style={{margin: `7% 0%`}}>
                    <input placeholder='Email Address' name="email" onChange={(e) => setEmail(e.target.value)} />
                    {empty.email && <p style={{color: `red`, paddingTop: `10px`}}>* Email field is empty</p>}
                </Form.Field>
                <Form.Field style={{margin: `7% 0%`}}>
                    <input placeholder='Password...' name="password" onChange={(e) => setPass(e.target.value)} />
                    {empty.pass && <p style={{color: `red`, paddingTop: `10px`}}>* Password field is empty</p>}
                </Form.Field>
                <Button type='submit' style={{background: `teal`, color: `#eee`}} onClick={registerUser}>Register</Button>
            </Form>
            <div style={{background: `url(${mob}) no-repeat center/contain`}}></div>
        </div>
    )
}
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import mobile from '../mobile.svg'

export const LoginForm: React.FC<{setEmail: any, setPass: any, loginUser: any, error: boolean, empty: any}> = ({setEmail, setPass, loginUser, error, empty}) => {
    return (
        <div style={{display: `grid`, gridTemplateColumns: `repeat(2, 1fr)`, height: `80vh`, padding: `3% 5%`}}>
            <div style={{background: `url(${mobile}) no-repeat center/contain`}}></div>
            <Form method="post" style={{padding: `3% 5%`}}>
            {/* <h1 style={{padding: `3% 15%`}}>Login</h1> */}
                <div>
                    <h2 className="ui icon center aligned header">
                        <i aria-hidden="true" className="users circular icon"></i>
                        <div className="content">Login</div>
                    </h2>
                </div>
                <Form.Field style={{margin: `3% 0%`}}>
                    <input placeholder='Email Address' name="email" onChange={(e) => setEmail(e.target.value)} />
                    {empty.email && <p style={{color: `red`, paddingTop: `10px`}}>* Email field is empty</p>}
                    {error && <p style={{color: `red`, paddingTop: `10px`}}>* Wrong email or password</p>}
                </Form.Field>
                <Form.Field style={{margin: `7% 0%`}}>
                    <input placeholder='Password...' name="password" onChange={(e) => setPass(e.target.value)} />
                    {empty.pass && <p style={{color: `red`, paddingTop: `10px`}}>* password field is empty</p>}
                </Form.Field>
                <Button type='submit' style={{background: `teal`, color: `#eee`}} onClick={loginUser}>Login</Button>
            </Form>
        </div>
    )
}
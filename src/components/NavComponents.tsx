import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import auth from '../PrivateRoute/Auth'
import { useHistory } from 'react-router'

export const List = () => {
    const path = useHistory()
    const token: string | null = sessionStorage.getItem("tok")
    let data: any = localStorage.getItem("username")
    const logoutUser = () => {
        auth.logout(() => {
            path.push("/login")
        })
        sessionStorage.tok = ""
        localStorage.username = ""
    }
    // console.log(JSON.parse(data))
    return (
      <Menu style={{padding: `1% 10%`, background: "teal", margin: "!important 0"}}>
        <Menu.Menu position='left'>
            <Menu.Item
            name='home'
            style={{ color: "#eee"}}
            />
        </Menu.Menu>
        <Menu.Menu position='left'>
            <Menu.Item
            name={data === null || data}
            style={{ color: "#eee"}}
            />
        </Menu.Menu>
        <Menu.Menu position='right'>
            {!token ? <Link to="/login">
                <Menu.Item
                name='Login'
                style={{ color: "#eee"}}
                />
            </Link>
            :
            null
            }
            {!token ? <Link to="/">
                <Menu.Item
                name='Register'
                style={{ color: "#eee"}}
                />
            </Link>
            :
            null
            }
            {token ? <Link to="/contacts">
                <Menu.Item
                    name='Contacts'
                    style={{ color: "#eee"}}
                />
            </Link>
            :
            null    
            }
            {token ? <Link to="/post">
                <Menu.Item
                    name='Add Contact'
                    style={{ color: "#eee"}}
                />
            </Link>
            :
            null    
            }
            {token ? <Menu.Item
                    name='logout'
                    style={{ color: "#eee"}}
                    onClick={logoutUser}
                />
            :
            null    
            }

        </Menu.Menu>
      </Menu>
    )
}
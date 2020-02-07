import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth'

// export function ProtectedRoute ({component: Component, ...rest}: React.PropsWithChildren<{component: any, render?: any}>) {
//     return (
//         <Route
//             {...rest}
//             render{props => {
//                 return <Component {...props}
//             }}
//         />
//     )
// }

export const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        auth.authenticate()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute/ProtectedRoute'
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import GetAllContacts from './components/GetAllContacts';
import PostContact from './components/PostContact';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/contacts">
            <GetAllContacts />
          </PrivateRoute>
          <PrivateRoute path="/post">
            <PostContact />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

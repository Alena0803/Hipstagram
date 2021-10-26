import React, { useEffect } from 'react';
import './App.scss';
import {Provider, connect}   from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Navibar} from './Components/NaviBar';
import { createBrowserHistory } from "history";
import { actionAuthLogout } from './Actions';
import store from './reducers';
import CLogin from './pages/Login';
import {Login} from "./pages/Login";
import { Router,Switch, Route, Link, useHistory } from "react-router-dom";
import CRegistration from './pages/Registration';
import RoleRoute from './Components/PrivateRoute';
import CNav from './Components/NaviBar';
import CProfile from './Components/Profile';
import Direct from './Components/Direct';
import Page from './Components/Page';
import ConnectedPost from './Components/ConnectedPost';
// import ConnectedUser from './Components/AllUsers';
import Footer from './Components/Footer';


function App() {
  return (
    <>
      <Provider store={store}>
      <Router history = {createBrowserHistory()}>
          <CNav />
          <Switch>
            <Route path='/' component={Page} exact />
            <RoleRoute path='/login' roles={['stranger']} component={CLogin}/>
            <RoleRoute path='/registration' roles={['stranger']} component={CRegistration}/>
            <RoleRoute path='/profile' roles={['user']} component={CProfile} />
            <RoleRoute path='/direct' roles={['user']} component={Direct} />
            <RoleRoute exact path='/posts' roles={['user']}  component={ConnectedPost}/>
            {/* <RoleRoute exact path='/users' roles={['user']}  component={ConnectedUser}/> */}
          </Switch>
          <Footer/>
      </Router>
      </Provider>
    </>
  );
}


export default App;

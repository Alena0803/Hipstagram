import React from "react";
import {connect}   from 'react-redux';
import {useState} from "react";
import {actionFullLogin} from '../Actions'
import Button from "../Components/Button";
import LoginError from "../Components/RegistrationError/LoginError";
import showImg from '../images/1kissclipart-password-icon-png-clipart-computer-icons-password-c1c120273aa97e68.png';
import hideImg from '../images/PngItem_202249.png';
import {Link, useHistory} from 'react-router-dom';
import { authReducer } from "../reducers/authReducer";
import { Redirect } from "react-router";
import { Nav } from "react-bootstrap";

const LoginForm = ({onLogin,loggedIn}) => {
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const [open,setOpen] = useState(false)
  const[show,setShow]=useState(false)

  let history = useHistory()

  if(localStorage.authToken) {
        history.push('/')
  }

  const isLoginValid = () => {
    if(!login || !password) {
        return false 
    }
    else return true
}

const loginCallback = () => {
    if(isLoginValid()) {
        onLogin(login, password)
    }
    else {
        setShow(true)
    }
}

  return (
    <div className="divLog">
        <h2>Вход</h2>
        <div className="logBox">

            <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин"></input>
        </div>
        <div className='inpContainer'>
            <input value={password} type={open ? "text" : "password"} onChange={e => setPassword(e.target.value)} placeholder="Пароль"  />
            <img src={open ? hideImg : showImg} onClick={() => setOpen(!open)}/>
        </div>
        <div className='logBox'>
            <Link to='registration'>Зарегистрироваться</Link>
            <Button name='Вход' isValid={isLoginValid()} callback={loginCallback} /> 
        </div> 
            {show && (!login || !password) && <LoginError />}
    </div>
    
  )
}


const CLogin = connect(state => ({loggedIn: state.authReducer.login}), {onLogin: actionFullLogin})(LoginForm)
export default CLogin

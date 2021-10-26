import React from "react";
import {connect}   from 'react-redux';
import {useState} from "react";
import {actionFullRegister} from '../Actions'
import {Redirect} from 'react-router-dom';
import ConfirmPasswordError from "../Components/RegistrationError/ConfirmPasswordError";
import PassMin from "../Components/RegistrationError/PassMin";
import NumberPass from "../Components/RegistrationError/NumberPass";
import showPwdImg from '../images/1kissclipart-password-icon-png-clipart-computer-icons-password-c1c120273aa97e68.png';
import hidePwdImg from '../images/PngItem_202249.png';
import Button from "../Components/Button";


const Registration = ({onReg,logIn}) => {
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const[show,setShow] = useState(false)
    const[show2,setShow2] = useState(false)
    const[show3,setShow3] = useState(false)

    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)
   

    const isRegistrationValid = () => {
        if(!login || password.length<3 || password2.length<3) {
            return false 
        }
        if(!password.match(/\d/)){
            return false
        }
        if(password !== password2) {
            return false
        }   
        else return true
    }

    const registrationCallback = () => {
        if(isRegistrationValid()) {
            onReg(login, password)
        }
        else {
            setShow(true)
            setShow2(true)
            setShow3(true)
        }
    }

    return (
      <div className="divReg">
          <h2>Регистрация</h2>
          <div className="logBox">
              <input value={login} onChange={e => setLogin(e.target.value)}  placeholder="Логин"></input>
          </div>
          <div className='inpContainer1'>
              <input value={password} type={open ? "text" : "password"} onChange={e => setPassword(e.target.value)}  placeholder="Пароль"  />
              <img src={open ? hidePwdImg : showPwdImg} onClick={() => setOpen(!open)}/>
          </div>
          <div className='inpContainer2'>
              <input value={password2} type={open2 ? "text" : "password"} onChange={e => setPassword2(e.target.value)}  placeholder="Пароль"  />
              <img src={open2 ? hidePwdImg : showPwdImg} onClick={() => setOpen2(!open2)}/>
          </div>

          <Button
                name='Зарегистрироваться'
                isValid = {isRegistrationValid()}
                callback = {registrationCallback}
            />
                {show && (!login || password.length<3 || password2.length<3) && <PassMin/>}
                {show2 && (!password.match(/\d/)) && <NumberPass />}
                {show3 && (password !== password2) && <ConfirmPasswordError />}
                {logIn && <Redirect push to='/'/>}
      </div>

    )
}

const CRegistration = connect(state => ({logIn:state.authReducer.payload}),{onReg: actionFullRegister})(Registration)
export default CRegistration
import React from 'react';
import { connect } from 'react-redux';
import { actionAuthLogout } from '../Actions';

const ButtonLogout = ({onLogout, isLoggedIn}) => {
return(
    <a className="btnExite" onClick={() => onLogout()}> Выход </a>
)
}
const BtnLogout = connect(state => ({isLoggedIn: state.authReducer.payload}),{onLogout: actionAuthLogout})(ButtonLogout)
export default BtnLogout
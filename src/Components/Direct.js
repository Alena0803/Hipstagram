import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {actionNewMessage} from '../Actions/index';


const mapDispatchToProps = (dispatch) => ({
    onNewMessage:  bindActionCreators(actionNewMessage,dispatch)
})

const Direct = connect(null, mapDispatchToProps)(({onNewMessage,updateRetly,idTo}) =>{
    const[textNewMessage,setTextNewMessage] = useState('')
    return(
        <div className='message'>
            <textarea className='textareaMessage' rows="4" cols="100" 
                      value = {textNewMessage}
                      onChange={e=>setTextNewMessage(e.target.value)}/>
            <button className='buttonMessage' onClick={()=>onNewMessage(idTo,textNewMessage)}>send</button>
        </div>
    )
})
export default Direct
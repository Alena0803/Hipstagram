import React, { useState } from 'react';
import {connect}   from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionComment} from '../Actions/index'


const mapDispatchToProps = (dispatch) => ({
    onComment:  bindActionCreators(actionComment,dispatch)
    })

const CommentUser = connect(null, mapDispatchToProps)(({onComment,updateRetly,idPost}) =>{
    const[textComment,setTextComment] = useState('')
    return(
        <div className='comment' style={{display:updateRetly !== false ? 'none':'block'}}>
            <textarea className='textareaComment' rows="4" cols="100" value = {textComment} onChange={e=>setTextComment(e.target.value)}/>
            <button className='buttonComment' onClick={()=>onComment(idPost,textComment)}>send</button>
        </div>
    )
})
export default CommentUser


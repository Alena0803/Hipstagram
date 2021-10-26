import React, { createElement, useState,useEffect,useRef } from 'react';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {connect}   from 'react-redux';
import {address,actionPost} from '../Actions/index';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => ({
  userId   : address`${state}authReducer.id`,
  nick : address`${state}promiseReducer.UserFindOne.payload.data.UserFindOne.nick`,
  avatar : address`${state}promiseReducer.UserFindOne.payload.data.UserFindOne.avatar.url`,
  login : address`${state}promiseReducer.UserFindOne.payload.data.UserFindOne.login`,
  state:state
})
const mapDispatchToProps = (dispatch) => ({
onPost:  bindActionCreators(actionPost,dispatch)
})

const Post = connect(mapStateToProps, mapDispatchToProps)(({onPost,userId,avatar, nick,updateRetly,login}) => {
const [likes, setLikes] = useState(0);
const [action, setAction] = useState(null);
const [text,setText] = useState('')
const ref = useRef()
if(nick === null || nick === undefined){
    nick = login || ""
}
if(avatar === null || avatar === undefined){
avatar = 'no avatar'
}

const like = () => {
    setLikes(1);
    setAction('liked');
};

const actions = [
    <Tooltip key="comment-basic-like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={()=> updateRetly()}>Комментарий</span>,
  ];

  return (
    <div className='AvaPost'>
      <div className="blockFoto">
          <form  action="/upload" method="post" enctype="multipart/form-data" ref={ref}>
                 <input className='newPhoto' type="file" name="photo" />
          </form>
          <textarea className='text' value={text} rows="4" cols="100" onChange={e=> setText(e.target.value)}></textarea>
          <div>
          <Comment actions={actions}/>
             <button  className='send'  onClick={()=>onPost(userId,text,ref.current)}>send</button>
          </div>
      </div>
    </div> 
  )
})

export default Post
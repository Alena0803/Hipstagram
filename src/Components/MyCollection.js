import React, { createElement,useState,useEffect } from 'react';
import {LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import {connect}   from 'react-redux';
import {address,actionLike} from '../Actions/index';
import Post from '../Components/Post new';
import Comments from '../Components/Comments';
import CommentUser from '../Components/Comment';
import { bindActionCreators } from 'redux';


const mapStateToProps = (state) => ({
    myCollection: address`${state}promiseReducer.MyCollection.payload.data.PostFind.`,
    state:state
})

const mapDispatchToProps = (dispatch) => ({
    onLike:  bindActionCreators(actionLike,dispatch)
})

const MyCollection =connect(mapStateToProps, mapDispatchToProps)(({state,myCollection,onLike})=>{
    const [newPost, setNewPost]= useState('false')
    if(!myCollection){
       myCollection = []
    }
    function deleteNull(value){
        return value !== null
    }
    const posts = myCollection.map(({posts}) =>{
        // debugger;
        const {_id,text,createdAt,images,likes,comments} = posts[0]
        console.log(likes)
        const [like, setLike] = useState(+(likes.length))
        const [action, setAction] = useState(null);
        const [updateRetly,setUpdateRetly] = useState('false')
        const [open, setOpen]= useState('false')
        useEffect(() => setLike(+(likes.length)),[likes])
        if(!comments){
            comments=[]
        }
        const actions = [
            <Tooltip key="comment-basic-like" title="Like">
              <span>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{like}</span>
              </span>
            </Tooltip>,
                <span key="comment-basic-reply-to"
                onClick={()=> setUpdateRetly(!updateRetly)}>Reply to</span>,
        ];
        if(images){
            return(
                <li key={_id}className='myPost'>
                       <img className='picture' src={images[0].url}  onClick={()=>onLike(_id)}></img>
                       <p>{text} </p>
                       <div className='time' ><Comment actions={actions}/>
                            <span>{new Date(+(createdAt)).toLocaleString()} </span>
                        </div>
                        <p onClick={()=>setOpen(!open)}>comments</p>
                        <Comments comments={comments} open={open}></Comments>
                        <CommentUser  updateRetly={updateRetly} idPost={_id}></CommentUser>
                </li>
            )}
        if(!images){
            return(
                 <li key={_id}
                     className='myPost'
                     >
                         <div className='noPiture' onClick={()=>onLike(_id)}><p>no picture</p></div>
                        <p>{text} </p>
                        <div className='time' ><Comment actions={actions}/>
                            <span>{new Date(+(createdAt)).toLocaleString()} </span>
                        </div>
                        <p onClick={()=>setOpen(!open)}>comments</p>
                        <Comments comments={comments} open={open}></Comments>
                        <CommentUser  updateRetly={updateRetly} idPost={_id}></CommentUser>
                     </li>
            )}
        })
    return(
        <>
        <button className='newPost' onClick={()=>setNewPost(!newPost)} >ADD POST</button>
        <div style={{ display: newPost === false ? "block" : 'none'}} ><Post/></div>
        <ul>{posts}</ul>
        </>
    )
})
export default MyCollection
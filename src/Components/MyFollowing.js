import React,{useState,useEffect} from 'react';
import {connect}   from 'react-redux';
import { bindActionCreators } from 'redux';
import {address, actionMyFollowing} from '../Actions/index';


const mapStateToProps = (state) => ({
    myFollowing   : address`${state}promiseReducer.MyFollowing.payload.data.UserFindOne.following`,
    state:state
})

const mapDispatchToProps = (dispatch) => ({
    onMyFollowing:bindActionCreators(actionMyFollowing,dispatch)
})

export const MyFollowing = connect(mapStateToProps, mapDispatchToProps)(({state,myFollowing,userId }) => {
if(myFollowing === undefined || myFollowing === null){
    myFollowing = []
}
    const users = myFollowing.map(user =>{
        let nick = user.nick
        if(user.nick === null || user.nick === undefined){
            nick = user.login || "un"
        }
        const arr = nick.split('')
        const [color,setColor]  = useState('#7265e6')
        if(user.avatar === null){
            user.avatar = 'no avatar'
          }
    
        useEffect(()=>{
            setColor()
        },[])
        if(user.avatar === 'no avatar'){
            return(
            <li key={user.id} className='user'>
                <h3> {nick} </h3>
                <button className='following'>message</button>
            </li>
            )
            }
        if(user.avatar !== 'no avatar'){
        return(
        <li key={user.id}  className='user'>
            <img className='imgUs' src={user.avatar.url} />
            <h3> {nick} </h3>
            <button className='following'>message</button>
        </li>
        )
        }
    })
    return(
        <>
     <ul>{users}</ul>
    </>
    )
})

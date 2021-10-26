import React, { useEffect } from 'react';
import store from '../reducers';
import { connect } from 'react-redux'
import { actionAllPosts } from '../Actions/index';
import { ConnectPosts } from './Post'

const Post = ({post=[]}) =>{
    useEffect(()=>{
        post();
    })
    console.log(store.getState())
    return(
        <ConnectPosts/>
    )
}

const ConnectedPost = connect(null, {post: actionAllPosts})(Post)

export default ConnectedPost
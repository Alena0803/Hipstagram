import {actionAllPosts} from '../Actions/index';
import React, {useState, useEffect} from 'react';
import store from '../reducers/index';
import {connect}   from 'react-redux';
import {ConnectedPosts} from '../Components/Allposts';
import MyCollection from '../Components/MyCollection';

 
const Post = ({posts = []}) => {
    console.log(posts)
    return (
        <main>
            <div className="wrapper">
                {posts.map(post=><ConnectPostDraw post = {post}/>)}
            </div>
        </main>
    )
}

const ConnectPosts = connect(state=>({posts: state?.promiseReducer?.allPosts?.payload?.data?.PostFind}), null)(Post)
export default ConnectPosts
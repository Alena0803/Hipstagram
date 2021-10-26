import React, { useEffect } from 'react';
import store from '../reducers';
import { connect } from 'react-redux'
import { actionAllUsers } from '../Actions/index';


const User = ({posts = []}) => {
    console.log("USER")
    return (
        <main>
            <div className="wrapper">
                {posts.map()}
            </div>
        </main>
    )
}

const ConnectedUser = connect(state=>({allUser: state?.promiseReducer?.AllUsers?.payload?.data?.UserFind}), null)(User)
export default ConnectedUser
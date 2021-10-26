import {connect}   from 'react-redux';
import React,{ useRef } from 'react';



const mapStateToProps = (state) => ({
    userId   : `${state}authReducer.id`,
    state:state
})

export const AddPicture = connect(mapStateToProps, null)(({userId,onUpload})=>{
    const ref = useRef()
    return(
        <div className='picture'>
            <form  action="/upload" method="post" enctype="multipart/form-data" ref={ref} className="form">
                 <input className='newPhoto'
                 type="file" name="photo"  onChange={() => {
                     console.log(ref.current)
                     onUpload(userId,ref.current)
                 }}/>
            </form>
        </div>
    )
})

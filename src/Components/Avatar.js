import { bindActionCreators } from 'redux';
import {connect}   from 'react-redux';
import { Avatar } from 'antd';
import {address, actionAvatar} from '../Actions/index';
import { AddPicture} from '../Components/AddPicture'; 
import account from '../images/account.png';

const mapStateToProps = (state) => ({
    avatar : address`${state}promiseReducer.Upload.payload.url`,
    state:state
})
const mapDispatchToProps = (dispatch) => ({
  onAvatar:  bindActionCreators(actionAvatar,dispatch)
})

export  const UserAvatar = connect(mapStateToProps, mapDispatchToProps)(({avatar,onAvatar})=> {

    if(avatar === null || avatar === undefined){
  return (
    <>
      <img src={account} className='imgAvatar' />
      < AddPicture onUpload = {onAvatar}></ AddPicture>
    </>
  )
  
}
  if(avatar !== 'no avatar'){
    return (
    <>
      <img className='imgAvatar' src={avatar} ></img>
      < AddPicture onUpload = {onAvatar}></AddPicture>
    </>
    )
  }
})

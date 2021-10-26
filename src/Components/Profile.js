import { connect } from "react-redux";
import { UserAvatar } from "./Avatar";
import { MyFollowing } from "./MyFollowing";
import MyCollection from "./MyCollection";


const Profile = () => {
    return (
        <div className= 'profile'>
        <div className='profileBox'>
            <div className = "user-block">
                <UserAvatar/> 
            </div>
             <div className="information-block">
                 <div className ='firstBlock'>
                        <ul className="counter-block">
                            <li className="item">
                                <span>{1}</span>
                                    Followers
                            </li>
                            <li className="item">
                                <MyFollowing></MyFollowing>
                                    MyFollowing
                            </li>
                     </ul>
                 </div>    
            </div> 
        </div>
         <div className='secondBlock'>
         <MyCollection/>
    </div> 
    </div> 
    )
}

const CProfile = connect(state => ({login: state.authReducer.payload.sub.login}))(Profile)
export default CProfile


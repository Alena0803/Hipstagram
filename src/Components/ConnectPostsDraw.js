import { connect } from 'react-redux';
import Like from '../Components/Like';
import Comment from '../Components/Koment';


const PostDraw = ({post}) => {
    let comments = post?.comments
    return (
        <div className="post">
            <div className="info">
                <div className="user">
                    <div className="profile-pic"><img src={`http://hipstagram.asmer.fs.a-level.com.ua/${post?.owner?.images?.[0]?.url}`} alt=""/></div>
                    <p className="username">{post?.owner?.nick}</p>
                </div>
                <img src="https://cdn-icons.flaticon.com/png/512/3018/premium/3018442.png?token=exp=1635002272~hmac=9668b3c558293f03a538136ca376ce33" className="options" alt=""/>
            </div>
            <img src={`http://hipstagram.asmer.fs.a-level.com.ua/${post?.images?.[0]?.url}`} className="post-image" alt=""/>
            <div className="post-content">
                <div className="reaction-wrapper">
                    <Like/>
                    <Comment/>
                </div>
                <p className="description"><span>{post?.owner?.nick} </span>{post?.text}</p>
                {comments?.map((comment) => <p className="comment">{comment?.text}</p>)}
            </div>
            <div className="comment-wrapper">
                <img src="https://cdn-icons.flaticon.com/png/512/3404/premium/3404134.png?token=exp=1635002530~hmac=969ac3de61045d0860c765c990751ebb" className="icon" alt=""/>
                <input type="text" className="comment-box" placeholder="Add a comment"/>
                <button className="comment-btn">post</button>
            </div>
        </div>
    )
}

export const ConnectPostDraw = connect(null, {posts: PostDraw})(PostDraw)
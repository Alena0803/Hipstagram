import { connect } from 'react-redux';



const PostDraw = ({post}) => {
    let comments = post?.comments
    return (
        <div className="post">
            <div className="info">
                <div className="user">
                    <div className="profile-pic"><img src={`http://hipstagram.asmer.fs.a-level.com.ua/${post?.owner?.images?.[0]?.url}`} alt="page"/></div>
                    <p className="username">{post?.owner?.nick}</p>
                </div>
            </div>
            <img src={`http://hipstagram.asmer.fs.a-level.com.ua/${post?.images?.[0]?.url}`} className="post-image" alt="post"/>
            <div className="post-content">
                <div className="reaction-wrapper">
                    <Like/>
                    <Comment/>
                </div>
                <p className="description"><span>{post?.owner?.nick} </span>{post?.text}</p>
                {comments?.map((comment) => <p className="comment">{comment?.text}</p>)}
            </div>
            <div className="comment-wrapper">
                <input type="text" className="comment-box" placeholder="Add a comment"/>
                <button className="comment-btn">Add</button>
            </div>
        </div>
    )
}

export const ConnectPostDraw = connect(null, {posts: PostDraw})(PostDraw)
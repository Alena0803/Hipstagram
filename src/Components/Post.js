import { connect } from 'react-redux';
import { ConnectPostDraw } from './ConnectPostsDraw';

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

export const ConnectPosts = connect(state=>({posts: state?.promiseReducer?.allPosts?.payload?.data?.PostFind}), null)(Post)

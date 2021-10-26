import React from 'react';

const Comments  = ({comments,open})=>{
    console.log(open)
    if(comments){
    const comment = comments.map(({_id,text,createdAt,owner})=>{
        if(!owner.nick){
            owner.nick = owner.login || "un"
        }
        const arr = owner.nick.split('')
        const name = `${arr[0]}${arr[1]}`.toUpperCase()
       
            if(owner.avatar){
            return(
                <li key={_id} className='postComments'>
                    <div className='userComments'>
                          <img className='imgComments' src={owner.avatar.url} ></img>
                          <h5>{owner.nick} </h5>
                    </div>
                    <p className='textComments'>{text} </p>
                    <div className='time'>
                            <span>{new Date(+(createdAt)).toLocaleString()} </span>
                    </div>
                   </li>
            )}
            if(!owner.avatar){
                return(
                    <li key={_id} className='postComments'>   
                            <div className='userComments'>
                              <div className='avaComments'>{name}</div>
                              <h5>{owner.nick} </h5>
                           </div>
                            <p className='textComments'>{text} </p>
                            <div className='time' >
                                 <span>{new Date(+(createdAt)).toLocaleString()} </span>
                            </div>
                       </li>
                )}
    })
    return(
    <><ul className='postsComments' style={{display:open !== false ? 'none':'block'}}>{comment}</ul></>
    )}
    if(!comments){
        return(
            <></>
        )
    }
}
export default Comments
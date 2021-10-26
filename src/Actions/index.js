const getGQL = (url) => (query, variables = {}) => {
  return fetch(url, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());
};

export let shopGQL = getGQL('/graphql')
export const actionAuthLogin = token => ({type:'LOGIN', token})
export const actionAuthLogout = () => ({type:"LOGOUT"})
export const actionPending = name => ({type: 'PROMISE', status: 'PENDING', name})
export const actionResolved = (name, payload) => ({type: 'PROMISE', status: 'RESOLVED', name, payload})
export const actionRejected = (name, error) => ({type: 'PROMISE', status: 'REJECTED', name, error})
export const actionPromise = (name, promise) => 
    async dispatch => {
        dispatch(actionPending(name))
        try{
            let payload = await promise
            dispatch(actionResolved(name, payload)) 
            return payload
        }
        catch(error){
             dispatch(actionRejected(name, error))
        }
}

export let log = async (login, password) => {
  let query = `query log($l: String!, $p: String!) {
        login(login: $l, password: $p)
      }`

  let variables = {
      "l": login,
      "p": password
  }

  let token = await shopGQL(query, variables)
  console.log(token)
  return token.data.login
}


const actionLogin = (login, password) => actionPromise("login", log(login, password))

export const actionFullLogin = (login, password) => {
  return async (dispatch) => {
      let result = await dispatch(actionLogin(login, password))
      if(result)
          dispatch(actionAuthLogin(result))
          window.location.reload();
  }
}

const actionRegister = (login,password) =>
    actionPromise('reg',shopGQL(`mutation reg($login: String!, $password: String!){
        createUser(login:$login, password: $password){
        _id 
        login
    }
}`,{login,password}))

export const actionFullRegister = (login,password) => 
  async dispatch => {
    let payload = await dispatch(actionRegister(login,password))
    if(payload.data.createUser != null){
      await dispatch(actionFullLogin(login,password))
    }
    else {
      console.log("user")
    }
}

export function actionFollowing(id,idFollowing){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'onFollowing',
              shopGQL (`query user($query:String){
                  UserFindOne(query:$query){following{_id}
                    }
                 }`,{query:JSON.stringify([{_id:id}])})
          )
      )
      let newArr = await dispatch(
          actionPromise(
              'onFollowing',
              shopGQL (`mutation following($user:UserInput){
                  UserUpsert( user:$user){
                      following{_id}
                  }
                }`,{user:{_id:id , following:[...data.data.UserFindOne.following,{_id:idFollowing}]}})
          )
      )
  }
}

export const actionGetPosts = () =>{
  console.log('news')
  return(
  actionPromise('allPosts', shopGQL(`query allposts{
      PostFind(query:"[{}]"){
          _id, text, title,
      owner{_id, nick}, 
      images{url},
      comments{text},
      createdAt
    }
  }`, {query: JSON.stringify([{parent:null}])})))
}

export function actionMyFollowing(id){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'MyFollowing',
              shopGQL(`query user($query:String){
                  UserFindOne(query:$query){following{_id login nick avatar{url} incomings{_id}}
                    }
                 }`,{query:JSON.stringify([{_id:id}])})
          )
      )
      return address`${data}data.UserFindOne.following`
  }
}


export function actionNewMessage (idTo,textDirect){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'NewMessage',
              shopGQL(`mutation newDirect($direct:DirectInput){
                  DirectUpsert(direct:$direct){
                    _id 
                  }
                }`,{direct:{text:textDirect,to:{_id:idTo}}})
          )
      )
      console.log(data)
  }
}


export function actionAvatar(idUser,form){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'Upload',
                  fetch('/upload', {
                      method: "POST",
                      headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                      body: new FormData(form)
                  }).then(res => res.json())
              ))
              console.log(data._id)
      let newAvatar = await dispatch(
          actionPromise(
              'Avatar',
              shopGQL(`mutation newImage($image:ImageInput){
                  ImageUpsert(image:$image){
                    _id owner{_id nick}
                  }
                }`,{image:{_id:data._id, userAvatar:{_id:idUser}}})

          )
      )
      console.log(newAvatar)
  }
}

export const address = ({1:path},obj,key,restOfPath) => (
  !path ? obj : (
 [key,...restOfPath] = path.split('.'),
 obj[key] && address([ ,restOfPath.join('.')],obj[key])
)
)


export function actionPost(idUser,textPost,form){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'Upload',
                  fetch('/upload', {
                      method: "POST",
                      headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                      body: new FormData(form)
                  }).then(res => res.json())
              ))
              console.log(data._id)
      let newPost = await dispatch(
          actionPromise(
              'Post',
              shopGQL(`mutation newPost($post:PostInput){
                  PostUpsert(post:$post){
                    _id 
                  }
                }`,{post:{text:textPost, images:{_id:data._id}}})
          )
      )
      let newCollection = await dispatch(
          actionPromise(
              'newCollection',
              shopGQL(`mutation collection($collection:CollectionInput){
                  CollectionUpsert(collection:$collection){
                    _id 
                  }
                }`,{collection:{posts:{_id:newPost.data.PostUpsert._id}}})
          )
      )
      console.log(newCollection)
  }
}

// export const actionPostById = (_id) => async (dispatch, getState) => {
//   await dispatch(actionGQLPostById(_id));
//   console.log(getState().promise?.postById.payload)
//   return await getState().promise?.postById.payload;
// };

// export const actionGQLPostById = (_id) =>
//     actionPromise(
//         'postById',
//         shopGQL(
//             `
//         query postById($query: String){
//             PostFindOne(query:$query) {
//               _id,
//               createdAt,
//               title,
//               images {
//                 text,
//                 url
//               },
//               comments {
//                 _id,
//                 text
//               }
//             }
//           }    
//         `,
//             { query: JSON.stringify([{ _id }]) },
//         ),
// );

const toQuery = (str, fields = ["title", "text", "login", "nick", '"_id"']) => {
  str = str.replace(/ +/g, " ").trim();
  str = "/" + str.split(" ").join("|") + "/";

  let arr = fields.map((s) => {
      return { [s]: str };
  });
  return { $or: arr };
};


export const actionSearchUser = (_id = "", str = "") => async (dispatch) => {
  let searchStr;
  str = toQuery(str);

  if (_id) {
      searchStr = { $and: [{ ___owner: _id }] };
      searchStr.$and.push(str);
  } else searchStr = { ...str };

  let searchData = await dispatch(
      actionPromise(
          "searchUser",
          shopGQL(
              `query search( $query:String){
              UserFind(query:$query) {
                  _id
                  nick
                  login
                  avatar {url}
            }
          }`,
              { query: JSON.stringify([searchStr]) }
          )
      )
  );
};

export function actionUserFindOne(name,params){ 
  console.log(name,params)
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              name,
              shopGQL(`query user($params:String!){
                       UserFindOne(query:$params){_id nick login following{
                          _id nick login avatar{_id url}
                        } 
                        avatar{_id url}
                       }
                      }`,{params})
          )
      )
  }
}

export function actionLike(idPost){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'Like',
              shopGQL(`mutation newLike($like:LikeInput){
                  LikeUpsert(like:$like){
                    _id 
                  }
                }`,{like:{post:{_id:idPost}}})
          )
      )
      console.log(data)
  }
}
export function actionComment(idPost,textComment){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'Comment',
              shopGQL(`mutation newComment($comment:CommentInput){
                  CommentUpsert(comment:$comment){
                    _id 
                  }
                }`,{comment:{text:textComment,post:{_id:idPost}}})
          )
      )
      console.log(data)
  }
}

export const actionAllPosts = () =>{
  console.log('news')
  return(
    actionPromise('allPosts',shopGQL(`query allposts($query: String!){
      PostFind(query:$query){
        _id, text, title,
        owner{_id, nick},
        images{url},
        likes{
          _id
        }
      }
    }`, {query:JSON.stringify([{},
    {sort:[{_id: -1}]}
  ])})))
}


const upload = file => {
      let fd = new FormData
      fd.append('photo', file)
      return fetch('/upload',{
        method:'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
      }).then(res=>res.json())
    }
    
export const actionUpload = (file) => (actionPromise("upload", upload(file)));

export function actionAllUsers(){
  return async dispatch=>{
      let data = await dispatch(
          actionPromise(
              'AllUsers',
              shopGQL(`query allUser{
                        UserFind(query:"[{},{\\"sort\\":[{\\"_id\\":-1}]}]"){
                            nick login createdAt _id avatar{_id url}}
          }`)
          )
      )
  }
}


export const actionUploadFile = (file) => {
  return actionPromise('photo',fetchFiles(file))
};

const fetchFiles = (file) => {  
  let fd = new FormData
  fd.append('photo', file)
  return fetch('/upload', {
    method: "POST",
    headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
    body: fd
  }).then(res => res.json())
}

export const actionUploadFiles = (files) => 
  actionPromise('photos',Promise.all(files.map(file => fetchFiles(file))))


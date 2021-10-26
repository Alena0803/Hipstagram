import React from "react"
import { connect } from "react-redux"
import { Redirect,Route } from "react-router"

const PrivateRoute = ({component,roles,auth, fallback='/login',...originProps}) => {
    const Wrapper = (pageProps) => {
      const Page = component
      console.log(auth)
      if(roles.includes('stranger')){
        return <Page {...pageProps} />
      }
      if(auth === undefined) {
        return <Redirect to={fallback} />
      }
      let userN = roles.filter(item => auth.includes(item))
      if(userN){
        return <Page {...pageProps} />
      }
      return <Redirect to={fallback} />
    }
    return (
      <Route component={Wrapper} {...originProps} />
    )
  }
const RoleRoute = connect(state => ({auth: state.authReducer?.payload?.sub.acl[1]}))(PrivateRoute)
export default RoleRoute
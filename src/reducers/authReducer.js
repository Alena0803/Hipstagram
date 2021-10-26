export function authReducer (state, action) {
    if(state === undefined){
        if(localStorage.authToken || localStorage.authToken === 'null') {
            action.type = 'LOGIN'
            action.token = localStorage.authToken
        }
        else {
            return {}
        }
    }
    if(action.type === 'LOGIN') {
        console.log('LOGIN')
        localStorage.authToken = action.token
        let tok = localStorage.authToken.split('.')[1]
        let decoded = JSON.parse(atob((tok)))
        return {token:action.token, payload: decoded}
    }
    if(action.type === 'LOGOUT') {
        console.log("LOGOUT")
        localStorage.authToken = ''
        return {}
    }
    return state
}
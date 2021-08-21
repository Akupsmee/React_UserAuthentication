const AuthHeader = ()=>{
    const token  = JSON.parse(localStorage.getItem('token'))

    if(token){
        return { Authourization : 'Bearer ' + token}
    }
    return {}
}

export default AuthHeader
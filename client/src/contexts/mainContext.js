import React, {useState} from 'react'

const mainContext = React.createContext()
const MainContextProvider = (props) => {
    const localJWT = localStorage.getItem('token')|| '';
    const [jwt, setJwt]= useState(localJWT)


    return (
       <mainContext.Provider value = {{ jwt, setJwt}}>
        {props.children}

       </mainContext.Provider>
    )
}

export {MainContextProvider, mainContext}

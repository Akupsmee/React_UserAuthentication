import React, {useContext, useEffect} from 'react'
import { mainContext } from '../contexts/mainContext'
import { useHistory } from 'react-router-dom'

const AuthComponent = (props) => {
    const {jwt} = useContext(mainContext)
    const history = useHistory()

    useEffect(() => {
        if(!jwt || jwt === ""){
            return history.push('/')
        }
    }, [])

    return (
        <div>
           {props.children} 
        </div>
    )
}

export default AuthComponent

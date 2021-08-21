import React from 'react'
import {Link} from "react-router-dom"

const Error = () => {
    return (
        <div style = {{height: '80vh', fontSize: '30px', flexDirection: 'column', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style ={{color: "red"}}>404</h1>
        <p style ={{color: "grey"}}>Your request could not be served</p>
        <Link style ={{color: "green", textDecoration: "none"}} to = "/"> Go to Home Page</Link>
            
        </div>
    )
}

export default Error

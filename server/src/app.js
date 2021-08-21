const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const morgan = require ("morgan")
const helmet = require("cors")
const cors = require("cors")
const config = require("./config/config")

const api = require("./routes")
const { isAuthenticated } = require("./middlewares")
const app = express()

// add a whitelist here
app.use(cors());
require("./services/passport")

app.use(morgan('dev'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(helmet())

mongoose.connect(config.db.mongoURI, {
useCreateIndex: true,  
useNewUrlParser: true, 
useFindAndModify: true, 
useUnifiedTopology:true    
})
.then(()=>console.log("database successfully established"))
.catch((err)=>console.log("error : ", err))

app.get("/", (req,res)=>{
    res.json({msg : "hello world 😜"})
})

// route matches /api/v1/user
app.use('/api/v1', api)
app.use(isAuthenticated)
module.exports = app
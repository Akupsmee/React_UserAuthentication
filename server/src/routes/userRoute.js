const router = require("express").Router()
const userController = require("../controllers/userController")
const {isAuthenticated, signup} = require("../middlewares")

// route matches api/v1/user/
router.get('/', (req,res)=>{
    res.send({
        message:'💻'
    })
})


// route matches api/v1/user/signup
router.post('/signup', signup, userController.signup)
router.get('/findall', userController.findall)




// route matches api/v1/user/login
router.post('/login', userController.login)

// route matches api/v1/user/dash
router.get('/dash', isAuthenticated, userController.findByID)

module.exports = router
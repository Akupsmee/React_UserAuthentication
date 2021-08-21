const express = require("express")
const userRoutes = require("./userRoute")

const router = express.Router()

router.use('/user', userRoutes)
router.use('/', userRoutes)

module.exports = router


const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { JwtSecret } = require("../config/config")



function jwtUser(user) {
    const ONE_WEEK = 7 * 24 * 3600
    return jwt.sign(user, JwtSecret, {
        expiresIn: ONE_WEEK,
    })
}

module.exports = {
    findByID: (req, res) => {
        const { user } = req;
        if (!user) {
            return res.status(400).send({ error: 'server is busy' })
        }
        return res.json(user)
    },

    signup: async function (req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()

            return res.send(
                {
                    user: userJson,
                    token: jwtUser(userJson)
                }
            )
        } catch (error) {
            if (Object.keys(error.keyValue[0] === 'username')) {
                return res.status(400).send({ error: 'This username already exists' })

            }
            // return res.status(400).send({error})
            return res.status(400).send({ error: 'something went wrong' })
        }
    },

    login: async function (req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
        
         
            if (!user) {
                return res.status(403).send({ error: 'Could not find Username, signup!' })
            }
            const isPasswordValid = await user.verifyPassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({ error: 'the login credentials are wrong' })
            }
            const userJson = user.toJSON()
            return res.send({
                user: userJson,
                token: jwtUser(userJson) 
            })
        } catch (error) {
            return res.status(500).send({ error: 'error detected, verify login details' })
        }
    },
    findall : async function (req, res) {
        try {
            const user = await User.find()
            res.json(user)
        } catch (error) {
            console.log(error);
        }
    }


}
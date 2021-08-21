const passport = require("passport")
const Joi = require('joi');

module.exports = {
    isAuthenticated: (req, res, next) => {
        passport.authenticate('jwt', function (err, user) {
            if (err || !user) {
                res.status(403).send({ error: 'Permission declined' })
            } else {
                req.user = user
                res.send(req.user)

            }
        })(req, res, next)
    },

    signup: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().email()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string().regex(
                // new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$")
                // must contain at leat 1 lowercase
                // must contain at leat 1 uppercase
                // must contain at leat 1 numeric
                // [!@#$] must contain at leat 1 special character
                // the password should be between  8 - 32
                new RegExp('^[a-zA-Z0-9]{8,12}$')
            )
        })
        const { error } = schema.validate(req.body)
        if (error) {
            switch (error.details[0].context.key) {
                case 'username':
                    return res.status(400).send({
                        error: 'valid email address required to register!, it must contain at least 1 lowercase,1 uppercase,1 numeric value,should be between 8 - 32 characters long.'
                    })
                    break;
                case 'password':
                    return res.status(400).send({
                        error: 'password does not meet requirements!'
                    })
                    break;
                default:
                    return res.status(400).send({
                        error: 'username or password is invalid!'
                    })
            }
        } else {
            next()
        }
    }
}
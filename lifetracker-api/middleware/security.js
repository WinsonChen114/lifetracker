const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

//Extract JWT from request Header
const jwtFrom = ({ headers }) => {
    console.log(headers)
    if (headers?.authorization) {
        //Authorization: "Bearer tokentext"
        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }

    return undefined
}
//Attach User to response object

const extractUserFromJwt = (request, response, next) => {
    console.log("trying extractUserFromJwt")
    try {
        const token = jwtFrom(request)
        if (token) {
            response.locals.user = jwt.verify(token, SECRET_KEY)
            console.log("extractUserFromJWT ", response.locals.user)
        }
        return next()
    }
    catch (err) {
        return next()
    }
}

//Verify an authed user exists

const requireAuthenticatedUser = (request, response, next) => {
    try {
        const {user} = response.locals
        console.log("requireAuthenticatedUser",user,"hsandnasldas")
        if(!user?.email)
        {
            console.log("JELKCmndBCnd")
            throw new UnauthorizedError()
        }
        return next()
    }
    catch(err)
    {
        return next(err)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}
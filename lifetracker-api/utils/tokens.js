const jwt = require("jsonwebtoken")
require('dotenv').config();
const { SECRET_KEY } = require("../config")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, {expiresIn: "24h"})

const createUserJwt = (user) => {
    const payload = {
        email: user.email
    }
    
    return generateToken(payload)
}

const validateToken = (token) => {
    try {
        let validated = jwt.verify(token, SECRET_KEY)
        console.log(validated)
        return validated
    }
    catch (err)
    {
        console.log(err)
        return {}
    }
}

module.exports = {
    generateToken,
    createUserJwt,
    validateToken
}

// const testToken = () =>{
//     const user = {email: "hello@gmail.com"}
//     const token = generateToken(user)

//     console.log({token})

//     const validatedToken = validateToken(token)
//     console.log({validatedToken})
// }

// testToken()
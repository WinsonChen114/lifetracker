const jwt = require("jsonwebtoken")
require('dotenv').config();
const { SECRET_KEY } = require("../config")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, {expiresIn: "24h"})

const validateToken = (token) => {
    try {
        let validated = jwt.verify(token, SECRET_KEY)
        return validated
    }
    catch (err)
    {
        console.log(err)
        return {}
    }
}

// const testToken = () =>{
//     const user = {email: "hello@gmail.com"}
//     const token = generateToken(user)

//     console.log({token})

//     const validatedToken = validateToken(token)
//     console.log({validatedToken})
// }

// testToken()
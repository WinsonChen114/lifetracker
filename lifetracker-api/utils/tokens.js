const jwt = require("jsonwebtoken")
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (data) => jwt.sign(data, SECRET_KEY, {algorithm: "HS256", expiresIn: 10000})

const validateToken = (token) => {
    try {
        let validated = jwt.verify(token, SECRET_KEY)
        return validated
    }
    catch (err)
    {
        console.log(err)
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
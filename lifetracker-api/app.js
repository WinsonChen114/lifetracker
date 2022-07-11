const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { BadRequestError, NotFoundError } = require("./utils/errors")
const security = require("./middleware/security")
const authRoutes = require("./routes/auth")
const nutritionRoutes = require("./routes/nutrition")
const activityRoutes = require("./routes/activity")

const app = express()

app.use(cors())
//Parse incoming request bodies with JSON payloads
app.use(express.json())
//log request info
app.use(morgan("tiny"))
//For every request, check if a user/token exists in the authorization header
//If it does, attach decoded user to res.locals
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/nutrition", nutritionRoutes)
app.use("/activity", activityRoutes)

app.get("/", async (request, response, next) => {
    response.status(200).json({ "ping": "pong" })
})

app.use((request, response, next) => {
    return next(new NotFoundError())

})

app.use((error, request, response, next) => {
    const status = error.status || 500
    const message = error.message

    return response.status(status).json({
        error: { message, status }
    })
})

module.exports = app
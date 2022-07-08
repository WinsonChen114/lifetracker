const express = require("express")
const router = express.Router()
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const User = require("../models/user")

router.post("/login", async (request, response, next) => {
    try {
        //Taking user's email and password and attemtping to authenticate them
        const user = await User.login(request.body)
        const token = createUserJwt(user)
        return response.status(200).json({ user, token })
    }
    catch (err) {
        next(err)
    }
})

router.post("/register", async (request, response, next) => {
    try {
        //Taking user's email, password, rsvp status, and the number of guests
        //and create a new user in database
        const user = await User.register(request.body)
        const token = createUserJwt(user)
        return response.status(201).json({ user, token })
    }
    catch (err) {
        next(err)
    }
})

router.get("/me", security.requireAuthenticatedUser, async(request, response, next) =>
{
    try {
        const { email } = response.locals.user
        const user = await User.fetchUserbyEmail(email)
        const publicUser = User.makePublicUser(user)
        return response.status(200).json({user: publicUser})

    }
    catch (err) {
        next(err)
    }
})

module.exports = router
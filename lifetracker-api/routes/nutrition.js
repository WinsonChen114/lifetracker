const express = require("express")
const router = express.Router()

router.get("/", async (request, response, next) => {
    try {
        //Returns an array of all nutrition entries belonging to the user
        const user = await User.login(request.body)
        return response.status(200).json({ user })
    }
    catch (err) {
        next(err)
    }
})

router.post("/", async (request, response, next) => {
    try {
        //Authenticated users can create a new nutrition entry when providing values for all the required fields
        const user = await User.login(request.body)
        return response.status(200).json({ user })
    }
    catch (err) {
        next(err)
    }
})

router.get("/:nutritionId", async (request, response, next) => {
    try {
        //Taking user's email, password, rsvp status, and the number of guests
        //and create a new user in database
        const user = await User.register(request.body)
        return response.status(201).json({ user })
    }
    catch (err) {
        next(err)
    }
})
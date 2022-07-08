const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Activity = require("../models/activity.js")

router.get("/", async (request, response, next) => {
    try {
        //Returns an array of all activity entries belonging to the user
        const user = response.locals.user
        const activities = await Activity.listactivityForUser(user)
        return response.status(200).json({ activities })
    }
    catch (err) {
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser, async (request, response, next) => {
    try {
        //Authenticated users can create a new activity entry when providing values for all the required fields
        const user = response.locals.user
        const activity = await Activity.createactivity({user, activity: request.body})
        return response.status(201).json({ activity })
    }
    catch (err) {
        next(err)
    }
})

router.get("/:activityId", async (request, response, next) => {
    try {
        //Taking user's email, password, rsvp status, and the number of guests
        //and create a new user in database
        const {activityId} = request.params
        const activity = await Activity.fetchactivitybyId(activityId)
        return response.status(200).json({ activity })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Activity = require("../models/Activity.js")

router.get("/", async (request, response, next) => {
    try {
        //Returns an array of all activity entries belonging to the user
        const user = response.locals.user
        const perDay = await Activity.calculateDailyCaloriesSummaryStats(user)
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(user)
        return response.status(200).json({ nutrition: { calories: { perDay, perCategory } } })
    }
    catch (err) {
        next(err)
    }
})

// router.get("/:activityId", async (request, response, next) => {
//     try {
//         //Taking user's email, password, rsvp status, and the number of guests
//         //and create a new user in database
//         const { activityId } = request.params
//         const activity = await Activity.fetchactivitybyId(activityId)
//         return response.status(200).json({ activity })
//     }
//     catch (err) {
//         next(err)
//     }
// })

module.exports = router
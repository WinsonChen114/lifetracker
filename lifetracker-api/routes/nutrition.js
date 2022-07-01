const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Nutrition = require("../models/nutrition.js")

router.get("/", async (request, response, next) => {
    try {
        //Returns an array of all nutrition entries belonging to the user
        const user = response.locals
        const nutritions = await Nutrition.listNutritionForUser(user)
        return response.status(200).json({ nutritions })
    }
    catch (err) {
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser, async (request, response, next) => {
    try {
        //Authenticated users can create a new nutrition entry when providing values for all the required fields
        const user = response.locals
        const nutrition = await Nutrition.createNutrition({user, post: request.body})
        return response.status(201).json({ nutrition })
    }
    catch (err) {
        next(err)
    }
})

router.get("/:nutritionId", async (request, response, next) => {
    try {
        //Taking user's email, password, rsvp status, and the number of guests
        //and create a new user in database
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionbyId(nutritionId)
        return response.status(200).json({ nutrition })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
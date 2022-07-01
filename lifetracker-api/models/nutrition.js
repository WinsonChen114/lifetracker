const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const db = require("../db")

class Nutrition {

    static async listNutritionForUser() {
        
    }

    static async createNutrition({nutrition, user}) {

    }

    static async fetchNutritionbyId(nutritionId) {
    }
}

module.exports = Nutrition
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors")
const db = require("../db")

class Activity {

    static async calculateDailyCaloriesSummaryStats(user) {
        const results = await db.query(`
        SELECT  ROUND(SUM(calories), 0) AS "totalCaloriesPerDay",
                created_at as "date"
        FROM    nutrition
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
        GROUP BY created_at
        ORDER BY created_at ASC
        `, [user.email])
        return results.rows
    }

    static async calculatePerCategoryCaloriesSummaryStats(user) {
        const results = await db.query(`
        SELECT  ROUND(AVG(calories), 1) AS "avgCaloriesPerCategory",
                category
        FROM nutrition
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
        GROUP BY category
        ORDER BY category ASC
        `, [user.email])
        return results.rows
    }
}

module.exports = Activity
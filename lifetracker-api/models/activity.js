const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors")
const db = require("../db")

class Activity {

    static async listActivityForUser(user) {
        const results = await db.query(`
        SELECT  id,
                name,
                category,
                calories,
                image_url as "imageUrl",
                quantity,
                user_id as "userId",
                created_at AS "createdAt"
        FROM activities
        WHERE user_id = (SELECT id FROM users WHERE email = $1)
        ORDER BY created_at DESC`
        , [user.email])

        return results.rows
        
    }

    static async createActivity({activity, user}) {
        const requiredFields = ["name", "category", "calories", "imageUrl"]
        requiredFields.forEach((field) => {
            if (!activity.hasOwnProperty(field)) {
                throw new BadRequestError("Missing " + field + " in request body.")
            }
        })

        const results = await db.query(`
        INSERT INTO activities(
            name,
            category,
            calories,
            image_url,
            user_id)
        VALUES($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
        RETURNING id, name, category, calories, image_url AS "imageUrl", user_id AS "userID", created_at AS "createdAt", quantity;
        `, [activity.name, activity.category, activity.calories, activity.imageUrl, user.email])

        return results.rows[0]

    }

    static async fetchActivitybyId(activityId) {
        const results = await db.query(`
        SELECT  id,
                name,
                category,
                calories,
                image_url as "imageUrl",
                quantity,
                user_id as "userId",
                created_at AS "createdAt"
        FROM activities
        WHERE id = $1`
        , [activityId])

        const activity = results.rows[0]

        if(!activity)
        {
            throw new NotFoundError()
        }

        return activity
    }
}

module.exports = Activity
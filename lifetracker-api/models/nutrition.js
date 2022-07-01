const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors")
const db = require("../db")

class Nutrition {

    static async listNutritionForUser(user) {
        const results = await db.query(`
        SELECT  n.id,
                n.name,
                n.category,
                n.calories,
                n.image_url as "imageUrl",
                n.quantity,
                n.user_id as "userId",
                n.created_at AS "createdAt"
        FROM nutrition AS n
        WHERE n.user_id = (SELECT id FROM users WHERE email = $1)
        ORDER BY n.created_at DESC`
        , [user.email])

        return results.rows
        
    }

    static async createNutrition({nutrition, user}) {
        const requiredFields = ["name", "category", "calories", "imageUrl"]
        requiredFields.forEach((field) => {
            if (!nutrition.hasOwnProperty(field)) {
                throw new BadRequestError("Missing " + field + " in request body.")
            }
        })

        const results = await db.query(`
        INSERT INTO nutrition(
            name,
            category,
            calories,
            image_url,
            user_id)
        VALUES($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
        RETURNING id, name, category, calories, image_url AS "imageUrl", user_id AS "userID", created_at AS "createdAt", quantity;
        `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.imageUrl, user.email])

        return results.rows[0]

    }

    static async fetchNutritionbyId(nutritionId) {
        const results = await db.query(`
        SELECT  n.id,
                n.name,
                n.category,
                n.calories,
                n.image_url as "imageUrl",
                n.quantity,
                n.user_id as "userId",
                n.created_at AS "createdAt"
        FROM nutrition AS n
        WHERE n.id = $1`
        , [nutritionId])

        const nutrition = results.rows[0]

        if(!nutrition)
        {
            throw new NotFoundError()
        }

        return nutrition
    }
}

module.exports = Nutrition
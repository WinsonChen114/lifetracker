require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const IS_TESTING = process.env.NODE_ENV === "test"

function getDatabaseUri()
{
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || "5433"
    const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test"
    const dbProdName = process.env.DATABASE_NAME || "lifetracker"
    const dbName = IS_TESTING ? dbTestName : dbProdName

    //If DATABASE_URL environment variable is provided, use that
    //Otherwise, create the db connection string ourselves

    return process.env.DATABASE_URL || "postgresql://"+dbUser+":"+dbPass+"@"+dbHost+":"+dbPort+"/"+dbName
}

const BCRYPT_WORK_FACTOR = 13

console.log("Lifetracker Config:".red)
console.log("PORT:".cyan, PORT)
console.log("IS_TESTING:".cyan, IS_TESTING)
console.log("DATABASE URI:".cyan, getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    IS_TESTING,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}

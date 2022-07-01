const app = require("./app")
const {PORT} = require("./config")

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🍣 Server listening on port ` + port)
})
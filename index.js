const express = require("express")
const app = express()
const port = 3000
const db = require("./models")
const userRouter = require("./routers/userRouter")
const fs = require("fs")

app.use(express.json())
app.use("/user", userRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(express.static(__dirname + "./public"))
app.use("./public", express.static("public"))

app.listen(port, (err) => {
  if (err) {
    console.log("ERROR: ".concat(err))
  } else {
    db.sequelize.sync({
      alter: true,
    })
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public")
    }
    console.log("APP RUNNING at ".concat(port, " \u2705"))
  }
})

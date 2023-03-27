const express = require("express")
const app = express()
const port = 3306
const db = require("./models")
// const fs = require("fs")

app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.get("/user", async (req, res) => {
  try {
    const result = await db.User.findAll()

    return res.status(200).json({
      message: "Success",
      data: result,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server Error",
    })
  }
})
app.post("/user/create", async (req, res) => {
  try {
    // const { name, mobile, education, usia, image } = req.body
    const result = await db.User.create(req.body)

    return res.status(200).json({
      message: "Success",
      data: result,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server Error",
    })
  }
})

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, (err) => {
  if (err) {
    console.log("ERROR: ".concat(err))
  } else {
    db.sequelize.sync({
      alter: true,
    })

    // if (!fs.existsSync("public")) {
    //   fs.mkdirSync("public")
    // }

    console.log("APP RUNNING at ".concat(port, " \u2705"))
  }
})

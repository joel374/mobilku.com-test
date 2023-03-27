const sharp = require("sharp")
const db = require("../models")

const userController = {
  view: async (req, res) => {
    try {
      const result = await db.User.findAll()

      return res.status(200).json({
        message: "Find All Users",
        data: result,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
  create: async (req, res) => {
    try {
      const image = req.file.filename
      const imageSplit = image.split(".")
      const { name, mobile, education, usia } = req.body

      await sharp(`./public/${req.file.filename}`)
        .resize(500, 500)
        .toFile(`./public/IMAGE1-${imageSplit[0]}.${imageSplit[1]}`)

      await sharp(`./public/${req.file.filename}`)
        .resize(1000, 1000)
        .toFile(`./public/IMAGE2-${imageSplit[0]}.${imageSplit[1]}`)

      const result = await db.User.create({
        name,
        mobile,
        education,
        usia,
        image1: `IMAGE1-${imageSplit[0]}.${imageSplit[1]}`,
        image2: `IMAGE2-${imageSplit[0]}.${imageSplit[1]}`,
      })

      return res.status(200).json({
        message: "User created successfully",
        data: result,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const image = req.file.filename
      const imageSplit = image.split(".")
      const { name, mobile, education, usia } = req.body

      await sharp(`./public/${req.file.filename}`)
        .resize(500, 500)
        .toFile(`./public/IMAGE1-${imageSplit[0]}.${imageSplit[1]}`)

      await sharp(`./public/${req.file.filename}`)
        .resize(1000, 1000)
        .toFile(`./public/IMAGE2-${imageSplit[0]}.${imageSplit[1]}`)

      const findUser = await db.User.findOne({
        where: {
          id: id,
        },
      })

      if (!findUser) {
        return res.status(404).json({
          message: "User not found",
        })
      }

      await db.User.update(
        {
          name,
          mobile,
          education,
          usia,
          image1: `IMAGE1-${imageSplit[0]}.${imageSplit[1]}`,
          image2: `IMAGE2-${imageSplit[0]}.${imageSplit[1]}`,
        },
        {
          where: {
            id: id,
          },
        }
      )

      return res.status(200).json({
        message: "User updated successfully",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}

module.exports = userController

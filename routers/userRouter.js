const express = require("express")
const router = express.Router()
const { upload } = require("../lib/uploader")
const userController = require("../controllers/userController")

router.get("/", userController.view)
router.post(
  "/create",
  upload({
    acceptedFileTypes: ["jpg", "jpeg", "png"],
    filePrefix: "PROFILE_PICTURE",
  }).single("image"),
  userController.create
)
router.patch(
  "/update/:id",
  upload({
    acceptedFileTypes: ["jpg", "jpeg", "png"],
    filePrefix: "PROFILE_PICTURE",
  }).single("image"),
  userController.update
)

module.exports = router

const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), userController.createUser);
router.post("/login", userController.login);

module.exports = router;

const usersController = require("../controllers/users");
const User = require("../models/user");

const { check, body } = require("express-validator");

const express = require("express");
const router = express.Router();

router.get("/:userId", usersController.getUser);
router.post("/login", usersController.logIn);
router.post(
  "/signup",
  check("email")
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email address already exists!");
      }
    })
    .trim(),
  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("name should be at least 5 ch!"),
  body("password", "password should be at least 6 ch")
    .trim()
    .isLength({ min: 6 }),
  check("confirmPassword", "2 passwords don't match").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
  usersController.signUp
);

module.exports = router;

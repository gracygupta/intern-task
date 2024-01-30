const express = require("express");
const auth = express.Router();
const { body } = require("express-validator");
const utilController = require("../controllers/util-controllers");
const auth_controller = require("../controllers/auth");

// @route   POST /login
// @desc    Login user and return jwt and user object
// @access  Public
auth.post(
  "/login",
  [
    body("username", "Invalid Credentials").isString().exists(),
    body("password", "Invalid Credentials").exists(),
  ],
  utilController.validateRequest,
  auth_controller.login
);

// @route   POST /register
// @desc    register user and return jwt and user object
// @access  Public
auth.post(
  "/register",
  [
    body("email", "email is required").isEmail().exists(),
    body("username", "username is required").isString().exists(),
    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .withMessage(
        "password must contain at least one special character, one uppercase alphabet and a mix of alphanumeric characters"
      ),
  ],
  utilController.validateRequest,
  auth_controller.register
);

module.exports = auth;

const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { validateNewUser } = require("../validators/userValidator");

// Controllers

const getSignUpPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/sign-up", { title: "Sign Up" });
  } catch (error) {
    throw new Error(`Couldn't get the sign up page: ${error}`);
  }
});

const postNewUserToDatabase = [
  validateNewUser,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/sign-up", {
          title: "Sign Up",
          errors: errors.array(),
        });
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
      await queries.postNewUser(req.body);
      res.redirect("/");
    } catch (error) {
      throw new Error(`Couldn't sign up new user: ${error}`);
    }
  }),
];

module.exports = { getSignUpPage, postNewUserToDatabase };

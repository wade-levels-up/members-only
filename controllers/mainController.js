require("dotenv").config();
const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const { validationResult } = require("express-validator");
const { validateSecretPasscode } = require("../validators/userValidator");

const getMainPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/main", { title: "Main", user: req.user });
  } catch (error) {
    throw new Error(`Couldn't get the main page: ${error}`);
  }
});

const postSecretPasscode = [
  validateSecretPasscode,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).render("pages/main", {
          title: "Main",
          user: req.user,
          errors: errors.array(),
        });
      }

      if (req.body.secret_passcode === process.env.SECRET_PASSCODE) {
        await queries.verifyMember(req.user.id);
        res.redirect("/main");
      } else {
        throw new Error(`Secret passcode invalid`);
      }
    } catch (error) {
      throw new Error(`Couldn't upgrade member status to verified: ${error}`);
    }
  }),
];

module.exports = { getMainPage, postSecretPasscode };

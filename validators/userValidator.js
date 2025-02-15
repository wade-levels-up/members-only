require("dotenv").config();
const { body } = require("express-validator");

const validateNewUser = [
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage("First name must only contain letters"),
  body("last_name")
    .trim()
    .isAlpha()
    .withMessage("Last name must only contain letters"),
  body("username").trim(),
  body("email")
    .trim()
    .isEmail({ require_tld: true })
    .withMessage(
      "Email must be a Top-Level Domain. For exmaple, ending in .com, .org or .net"
    ),
  body("password").trim(),
  body("confirm_password").trim(),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
  body("admin_passcode")
    .optional()
    .trim()
    .custom((value) => {
      if (value && value !== process.env.ADMIN_PASSCODE) {
        throw new Error("Invalid admin passcode.");
      }
      return true;
    }),
];

const validateSecretPasscode = [
  body("secret_passcode").custom((value) => {
    if (value && value !== process.env.SECRET_PASSCODE) {
      throw new Error("Secret passcode is invalid");
    }
    return true;
  }),
];

const validateMessage = [
  body("message")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Message must be at most 200 characters long"),
];

module.exports = { validateNewUser, validateSecretPasscode, validateMessage };

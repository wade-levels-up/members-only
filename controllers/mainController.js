require("dotenv").config();
const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const { validationResult } = require("express-validator");
const {
  validateSecretPasscode,
  validateMessage,
} = require("../validators/userValidator");
const { format } = require("date-fns");

const getMainPage = asyncHandler(async (req, res) => {
  try {
    const messages = await queries.getAllMessages();
    res.render("pages/main", {
      title: "Main",
      user: req.user,
      messages: messages,
      formatDate: format,
    });
  } catch (error) {
    throw new Error(`Couldn't get the main page: ${error}`);
  }
});

const postSecretPasscode = [
  validateSecretPasscode,
  asyncHandler(async (req, res) => {
    try {
      const messages = await queries.getAllMessages();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).render("pages/main", {
          title: "Main",
          user: req.user,
          errors: errors.array(),
          formatDate: format,
          messages: messages,
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

const postNewPost = [
  validateMessage,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/main", {
          title: "Main",
          user: req.user,
          errors: errors.array(),
        });
      }

      await queries.addNewPost(req.user.id, req.body.message);
      res.redirect("/main");
    } catch (error) {
      throw new Error(`Couldn't post new message: ${error}`);
    }
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  try {
    await queries.deletePost(req.body.message_id);
    res.redirect("/main");
  } catch (error) {
    throw new Error(`Couldn't delete post: ${error}`);
  }
});

module.exports = { getMainPage, postSecretPasscode, postNewPost, deletePost };

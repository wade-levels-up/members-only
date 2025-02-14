const { Router } = require("express");
const loginRouter = Router();
const passport = require("passport");

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/",
  })
);

module.exports = loginRouter;

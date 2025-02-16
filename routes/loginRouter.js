const { Router } = require("express");
const loginRouter = Router();
const passport = require("passport");

loginRouter.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed, re-render the homepage with an error message
      return res.render("pages/index", {
        error: "Invalid username or password",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication succeeded, redirect to /main
      return res.redirect("/main");
    });
  })(req, res, next);
});

module.exports = loginRouter;

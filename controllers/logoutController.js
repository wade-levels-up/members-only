const asyncHandler = require("express-async-handler");

const handleLogout = asyncHandler(async (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).send(`Couldn't log out: ${error}`);
    }

    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send(`Couldn't destroy session: ${error}`);
      }

      res.clearCookie("connect.sid", { path: "/" });

      res.redirect("/");
    });
  });
});

module.exports = { handleLogout };

const asyncHandler = require("express-async-handler");

const getMainPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/main", { title: "Main", user: req.user });
  } catch (error) {
    throw new Error(`Couldn't get the main page: ${error}`);
  }
});

module.exports = { getMainPage };

const asyncHandler = require("express-async-handler");

const getHomepage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/index", { title: "Home" });
  } catch (error) {
    throw new Error(`Couldn't get the home page: ${error}`);
  }
});

module.exports = { getHomepage };

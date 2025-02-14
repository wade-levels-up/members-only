const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const getJoinPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/join", { title: "Join The Club" });
  } catch (error) {
    throw new Error(`Couldn't get the join page: ${error}`);
  }
});

const postNewMember = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(`Couldn't set member status: ${error}`);
  }
});

module.exports = { getJoinPage };

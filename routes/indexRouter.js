const { Router } = require("express");
const indexController = require("../controllers/indexController.js");
const indexRouter = Router();

indexRouter.get("/", indexController.getHomepage);

module.exports = indexRouter;

const { Router } = require("express");
const mainRouter = Router();
const mainController = require("../controllers/mainController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

mainRouter.get("/", ensureAuthenticated, mainController.getMainPage);

module.exports = mainRouter;

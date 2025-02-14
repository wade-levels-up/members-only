const { Router } = require("express");
const logoutRouter = Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const logoutController = require("../controllers/logoutController");

logoutRouter.get("/", ensureAuthenticated, logoutController.handleLogout);

module.exports = logoutRouter;

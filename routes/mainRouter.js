const { Router } = require("express");
const mainRouter = Router();
const mainController = require("../controllers/mainController");

mainRouter.get("/", mainController.getMainPage);
mainRouter.post("/", mainController.postSecretPasscode);

module.exports = mainRouter;

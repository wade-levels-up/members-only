const { Router } = require("express");
const mainRouter = Router();
const mainController = require("../controllers/mainController");

mainRouter.get("/", mainController.getMainPage);
mainRouter.post("/verifyMember", mainController.postSecretPasscode);
mainRouter.post("/newPost", mainController.postNewPost);

module.exports = mainRouter;

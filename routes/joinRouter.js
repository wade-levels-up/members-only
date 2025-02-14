const { Router } = require("express");
const joinController = require("../controllers/joinController.js");
const joinRouter = Router();

joinRouter.get("/", joinController.getJoinPage);
// joinRouter.post("/", joinController.postNewMember);

module.exports = joinRouter;

const { Router } = require("express");
const { startGame } = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/", startGame);

module.exports = userRouter;

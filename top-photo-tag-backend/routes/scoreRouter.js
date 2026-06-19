const { Router } = require("express");
const { getScoreboard } = require("../controllers/scoreController.js");

const scoreRouter = Router();

scoreRouter.get("/", getScoreboard);

module.exports = scoreRouter;

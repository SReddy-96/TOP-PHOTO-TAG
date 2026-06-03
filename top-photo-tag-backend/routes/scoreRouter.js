const { Router } = require("express");

const scoreRouter = Router();

scoreRouter.get("/", (req, res) => {
  res.json({ msg: "hello score" });
});

module.exports = scoreRouter;
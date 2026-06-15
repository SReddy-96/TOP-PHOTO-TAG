const { Router } = require("express");
const {
  getCharacter,
  postCharacter,
} = require("../controllers/characterController");

const characterRouter = Router();

characterRouter.get("/", getCharacter);
characterRouter.post("/", postCharacter);

module.exports = characterRouter;

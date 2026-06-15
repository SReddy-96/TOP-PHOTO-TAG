require("dotenv").config();
const db = require("../db/queries");

const getCharacter = async (req, res, next) => {
  try {
    const characters = await db.getAllCharacters();
    res.status(200).json(characters);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

const postCharacter = async (req, res, next) => {
  try {
    const { user_id, character_id, x, y } = req.body;
    const character = await db.findCharacterById(parseInt(character_id));
    const user = await db.findUserById(parseInt(user_id));

    // check if x and y are within range
    if (
      character.x > parseFloat(x) - 5 &&
      character.x < parseFloat(x) + 5 &&
      character.y > parseFloat(y) - 5 &&
      character.y < parseFloat(y) + 5
    ) {
      await db.foundCharacter(parseInt(user_id), parseInt(character_id));
      // check to see if all have been found
      const charactersFound = await db.foundCharacterAmount(parseInt(user_id));
      if (charactersFound === parseInt(process.env.AMOUNT_OF_CHARACTERS)) {
        // redirect to scoreboard, all characters found and take end time and work out score
        const end_time = new Date();
        const score_time = Math.floor((end_time - user.start_time) / 1000);
        // add end_time and score
        await db.addScore(user.id, end_time, score_time);
        res.json({ status: "all found" });
      } else {
        // carry on game but need to update dropdown like a rerender
        res.json({ status: "found", character_id: character_id });
      }
    } else {
      // this is where they fail
      res.json({ status: "not found" });
    }
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports = {
  getCharacter,
  postCharacter,
};

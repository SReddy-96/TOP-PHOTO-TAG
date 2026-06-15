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
        res.json("finished");
      } else {
        // carry on game but need to update dropdown like a rerender
        res.json({ status: "found", character_id: character_id });
      }
    } else {
      // this is where they fail
      res.json("failed");
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

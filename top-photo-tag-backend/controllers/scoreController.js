require("dotenv").config();
const db = require("../db/queries");

const getScoreboard = async (req, res, next) => {
  try {
    const scoreboard = await db.getAllScoreboard();
    res.status(200).json(scoreboard);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports = {
  getScoreboard,
};

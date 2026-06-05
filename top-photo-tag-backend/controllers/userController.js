const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// validate updated name
const notEmptyErr = "must not be empty";
const lengthErr = "must be between 2 and 30 characters.";

// Validate
const validateName = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`name ${notEmptyErr}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`Name ${lengthErr}`)
    .matches(/^[a-zA-Z0-9_.-]+$/) // Recommended: Allow letters, numbers, underscore, dot, hyphen
    .withMessage(
      "Name can only contain letters, numbers, underscores, dots, and hyphens.",
    )
    .custom(async (value) => {
      const user = await db.checkUserExists(value);
      if (user) {
        throw new Error("Name already in use");
      }
      return true;
    }),
];

// Create
const startGame = [
  validateName,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name } = req.body;
      const start_time = new Date();
      const newUser = await db.createUser(name, start_time);
      res.status(201).json(newUser);
    } catch (err) {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  },
];
// Read

module.exports = {
  startGame,
};

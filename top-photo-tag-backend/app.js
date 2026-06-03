require("dotenv").config();

const express = require("express");

// middleware
const errorHandler = require("./middlewares/errorHandler");

// routes
const IndexRouter = require("./routes/indexRouter");
const ScoreRouter = require("./routes/scoreRouter");

const app = express();

// Backend understands JSON
app.use(express.json());

// parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", IndexRouter);
app.use("/score", ScoreRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
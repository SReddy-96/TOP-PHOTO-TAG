require("dotenv").config();

const express = require("express");
const cors = require("cors");

// middleware
const errorHandler = require("./middlewares/errorHandler");

// routes
const IndexRouter = require("./routes/indexRouter");
const ScoreRouter = require("./routes/scoreRouter");
const UserRouter = require("./routes/userRouter");
const CharacterRouter = require("./routes/characterRouter")

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// cors
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Backend understands JSON
app.use(express.json());

// parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", IndexRouter);
app.use("/score", ScoreRouter);
app.use("/user", UserRouter);
app.use("/character", CharacterRouter)

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

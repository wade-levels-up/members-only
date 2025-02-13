const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session); // ??? IWTKM
const pool = require("./db/pool");

// Require Routes
const indexRouter = require("./routes/indexRouter");

// Configuration and create express instance
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.use(express.json()); // ??? IWTKM
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static("public"));

// Setup session // ??? IWTKM
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(passport.session()); // ??? IWTKM

// Routes
app.use("/", indexRouter);

// Error handling

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("pages/error", { title: "Error", error: err.message });
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session); // ??? IWTKM
const pool = require("./db/pool"); // Database
const queries = require("./db/queries");
const bycrpyt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const checkAuth = require("./middleware/ensureAuthenticated");

// Require Routes
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const loginRouter = require("./routes/loginRouter");
const mainRouter = require("./routes/mainRouter");
const logoutRouter = require("./routes/logoutRouter");

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

// Passport

app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await queries.getUserByUsername(username);
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bycrpyt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await queries.getUserById(id);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes

////  Public Routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);

////  Middleware to ensure authentication for routes below
app.use(checkAuth.isAuth);

////  Protected Routes
app.use("/main", mainRouter);
app.use("/logout", logoutRouter);

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

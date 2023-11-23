const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');


const {initializePassport} = require("./utils/passport");

// $ Importing Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const atmRouter = require("./routes/atm");
const statusRouter = require("./routes/cashstatus");
const reviewRouter = require("./routes/review");
const dashboardRouter = require("./routes/dashboard");

//$ Create the Express application
const app = express();


//$ Middleware that allows Express to parse through both JSON and x-www-form-urlencoded request bodies
//$ These are the same as `bodyParser` - you probably would see bodyParser put here in most apps

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));

initializePassport(passport);

app.use(cors());



// $ Routes Endpoints
app.use("/auth", authRouter.router);
app.use("/user",userRouter.router);
app.use("/atm",atmRouter.router);
app.use("/cashstatus",statusRouter.router);
app.use("/review",reviewRouter.router);
app.use("/dashboard",dashboardRouter.router);

module.exports = app;

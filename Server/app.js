const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const api = require("./routes/api");
const morgan = require("morgan");
require("./config/passport");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/v1", api);

module.exports = app;

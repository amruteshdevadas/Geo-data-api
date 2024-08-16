import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import locationRouter from "./routes/locations.js";
import fencesRouter from "./routes/geofences.js";
const app = express();

// view engine setup
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/locations", locationRouter);
app.use("/geo-fences", fencesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Connect to MongoDB using a URI
const mongoUri = "mongodb://127.0.0.1:27017/geao-data-app";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

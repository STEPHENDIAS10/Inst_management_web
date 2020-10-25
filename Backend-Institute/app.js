const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const exampleRoutes = require('./api/modules/example/example.routes');
const userRoutes = require('./api/modules/user/user.routes');
const studentRoutes = require('./api/modules/student/student.routes');
const courseRoutes = require('./api/modules/course/course.routes');
const instituteRoutes = require('./api/modules/institute/institute.routes');
const inquiryRoutes = require('./api/modules/inquiry/inquiry.routes');

mongoose.connect("mongodb+srv://shubhamg_7292:gawade2927@cluster0-cr1db.mongodb.net/InstituteManagement?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/example", exampleRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoutes);
app.use("/institute", instituteRoutes);
app.use("/inquiry", inquiryRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

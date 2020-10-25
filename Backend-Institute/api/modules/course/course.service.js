const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Course = require("./course.model");

const CourseService = this;

exports.createCourseDocument = (req) => {
  const data = new Course({
    _id: new mongoose.Types.ObjectId(),
    courseName: req.body.courseName,
    duration: req.body.duration,
    value: req.body.value,
    fees: req.body.fees,
    Institute_id: req.body.Institute_id,
  });
  return data;
};

exports.createCourseService = async (courseData) => {
  const course = await Course.findOne({
    Institute_id: courseData.Institute_id,
    courseName: courseData.courseName,
  });
  if (course) {
    throw new Error("Course name already exist");
  } else {
    return await courseData.save();
  }
};

exports.getCourseData = async (searchObject) => {
  const condition = { _id: searchObject };
  const course = await Course.findOne(condition);

  if (!course) {
    return false;
  } else {
    return course;
  }
};

exports.getCourseService = async (instId) => {
  const course = await Course.find({ Institute_id: instId });
  if (course) {
    return course;
  } else {
    return false;
  }
};

exports.checkCourse = async (data) => {
  const course = await Course.findOne({
    _id: data.id
  });

  if (course) {
    return await Course.deleteOne({ _id: data.id });
  } else {
    throw new Error("Course does not exist ");
  }
};

exports.findCourse = async (body) => {
  const course = await Course.findOne({
    courseName: body.courseName,
    Institute_id: body.Institute_id,
  });
  if (course) {
    return course;
  } else {
    throw new Error("Course not exist");
  }
};

exports.updateCourse = async (data) => {
  const courseUpdate = await Course.updateOne(
    { _id: data._id },
    {
      courseName: data.courseName,
      duration: data.duration,
      value: data.value,
      fees: data.fees,
    }
  );

  if (courseUpdate) {
    return courseUpdate;
  } else {
    return false;
  }
};

exports.findCourseService = async (data) => {
  const course = await Course.findOne({
    Institute_id: data.instid,
    courseName: data.courseName,
  });

  if (course) {
    return course;
  } else {
    throw new Error("Course does not exist ");
  }
};

const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CourseService = require("../course/course.service");
const Course = require("../course/course.model");

exports.createCourse = async (req, res, next) => {
  try {
    const courseData = CourseService.createCourseDocument(req);
    const course = await CourseService.createCourseService(courseData);

    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const Institute_Id = req.params.instId;
    const course = await CourseService.getCourseService(Institute_Id);
    const courseNameData = [];
    for(let i =0;i<course.length;i++) {
      courseNameData[i] = course[i].courseName;
    }
    res.status(200).json({
      course,
      courseNameData //This is to send the course name only for loading in ng - multiselect dropdown
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.findCourse = async (req, res, next) => {
  try {
    courseData = {
      courseName: req.body.name,
      instid: req.body.instid,
    };
    const course = await CourseService.findCourseService(courseData);
    
    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      id: id
    };

    const course = await CourseService.checkCourse(data);
    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.getCourseData = async (req, res, next) => {
  try {
    const course = await CourseService.getCourseData(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Can not Search course",
      });
    } else {
      return res.status(201).json({
        message: "course Search Done",
        course: course,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const courseUpdate = await CourseService.updateCourse(req.body);

    if (!courseUpdate) {
      return res.status(404).json({
        message: "Course not Updated",
      });
    } else {
      return res.status(201).json({
        message: "Course Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

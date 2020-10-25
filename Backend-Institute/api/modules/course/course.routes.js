const express = require("express");
const router = express.Router();

const CourseController = require("../course/course.controller");

router.post("/", CourseController.createCourse);

router.get("/:instId", CourseController.getCourses);

router.put("/", CourseController.updateCourse);

router.post("/courseFind", CourseController.findCourse);

router.delete("/courseDelete/:id", CourseController.deleteCourse);

router.get("/courseSearch/:id", CourseController.getCourseData);

module.exports = router;

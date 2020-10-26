const express = require("express");
const router = express.Router();

const StudentController = require("../student/student.controller");

router.post("/", StudentController.createStudent);

router.get("/institute/:instituteId", StudentController.getStudentsByInstituteId);

router.get("/:studentId", StudentController.getStudent);

router.delete("/:studentId", StudentController.deleteStudent);

router.put("/", StudentController.updateStudent);

module.exports = router;

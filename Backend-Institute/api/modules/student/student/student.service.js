const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../student/student.model");

exports.createStudentDoc = (data) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    courses: data.courses,
    institute: data.instituteId
  });
  return student;
};

exports.createStudent = async (StudentData) => {
  const saveStudent = await StudentData.save();
  if (saveStudent) {
    return true;
  } else {
    return false;
  }
};


exports.getStudent = async (searchObject) => {
  const student = await Student.findOne(searchObject);
  return student;
};

exports.getStudents = async (searchObject) => {
  const studentList = await Student.find(searchObject);
  return studentList;
};

exports.deleteStudent = async (id) => {
  const studentDelete = await Student.deleteOne({ _id: id });
  return studentDelete;
};

exports.updateStudent = async (data) => {
  const studentUpdate = await Student.updateOne(
    { _id: data.id },
    {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      courses: data.courses,
    }
  );

  return studentUpdate;
};

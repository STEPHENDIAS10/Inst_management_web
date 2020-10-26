const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
var nodemailer = require("nodemailer");

const UserService = this;

exports.createUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new Error("User already exist");
  } else {
    return await userData.save();
  }
};

exports.validateBody = (body) => {
  return true;
};

exports.createUserDoc = (req) => {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  return data;
};

exports.findUser = async (userData) => {
  const user = await User.findOne({
    email: userData.email,
    password: userData.password,
  });
  return user;
};

exports.loginUser = async (userData) => {
  const user = await UserService.findUser(userData);
  if (user) {
    return user;
  } else {
    throw new Error("Auth failed");
  }
};

exports.updateEmail = async (data) => {
  const emailexist = await User.findOne({ email: data.email });

  if (emailexist) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'shubhamiit91@gmail.com',
        pass: 'yjkdqshszjzuyvon'
      },
    });

    const html = `Hi there,
          this is your one time generated link for reset password.
          https://institue-management.herokuapp.com/resetPassword/${emailexist._id}

    Have a good day!`;

    const mailOptions = {
      from: 'shubhamiit91@gmail.com',
      to: data.email,
      subject: "Password Reset Link",
      text: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return true;
  } else {
    return false;
  }
};

exports.updatePassword = async (data) => {
  const userexist = await User.findOne({ _id: data._id });

  if (userexist) {
    const updatepassword = await User.updateOne(
      { _id: data._id },
      { password: data.password }
    );
    if (updatepassword) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.getUser = async (id) => {
  const usersList = await User.findOne({ _id: id });

  if (usersList) {
    return usersList;
  } else {
    return false;
  }
};

exports.deleteUser = async (data) => {
  const userDelete = await User.deleteOne({ _id: data });
  if (userDelete) {
    return userDelete;
  } else {
    return false;
  }
};

exports.updateUser = async (data) => {
  const userUpdate = await User.updateOne(
    { _id: data._id },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }
  );

  if (userUpdate) {
    return userUpdate;
  } else {
    return false;
  }
};

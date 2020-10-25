const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Inquiry = require("../inquiry/inquiry.model");



exports.getInquiries = async (instituteId) => {
    const inquiries = await Inquiry.find({instituteId:instituteId});
    return inquiries;
};


exports.getInquiry = async (searchObject) => {
  const inquiry = await Inquiry.findOne(searchObject);
  return inquiry;
};


exports.createInquiryDocument= (req) => {
    const inquiry = new Inquiry({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        mobileNo: req.body.mobileNo,
        courses: req.body.courses,
        instituteId: req.body.instituteId,
        query: req.body.query
    });
    return inquiry;
};

exports.createInquiry = async (Inquiry) => {
    const inquiry = await Inquiry.save();
    
    if(inquiry) {
        return inquiry;
    } else {
        return false;
    }
};

exports.updateInquiry = async (inquiryData) => {
    const inquiry = await Inquiry.updateOne(
      { _id: inquiryData._id },
      {
        firstName: inquiryData.firstName,
        lastName: inquiryData.lastName,
        email: inquiryData.email,
        gender: inquiryData.gender,
        mobileNo: inquiryData.mobileNo,
        courses: inquiryData.courses,
        query: inquiryData.query
      }
    );
  
    if (inquiry) {
      return inquiry;
    } else {
      return false;
    }
};

exports.deleteInquiry = async (inquiryData) => {
    const inquiry = await Inquiry.findOne({
      _id: inquiryData.id
    });
  
    if (inquiry) {
      return await Inquiry.deleteOne({ _id: inquiryData.id });
    } else {
      throw new Error("Inquiry does not exist ");
    }
  };

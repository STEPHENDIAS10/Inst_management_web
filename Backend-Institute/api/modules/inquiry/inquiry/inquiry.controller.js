const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Inquiry = require("../inquiry/inquiry.model");
const InquiryService = require('../inquiry/inquiry.service')

exports.getInquiry = async (req, res, next) => {
  try {
    const inquiry = await InquiryService.getInquiry({ _id: req.params.inquiryId });

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry Search unsuccessful"
      });
    } else {
      return res.status(201).json({
        message: "Inquiry search successful",
        inquiry: inquiry
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};

exports.getInquiriesByInstituteId = async (req, res, next) => {
  try {
    const instituteId = req.params.instituteId;
    const inquiries = await InquiryService.getInquiries(instituteId);
    return res.status(200).json({
      inquiries
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
}

exports.createInquiry = async (req, res, next) => {
  try {
    const inquiryData = await InquiryService.createInquiryDocument(req);
    const inquiry = await InquiryService.createInquiry(inquiryData);

    res.status(200).json({
      inquiry,
      message: "Inquiry Saved Successfully"
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    });
  }
};


exports.updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await InquiryService.updateInquiry(req.body);

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not Updated",
      });
    } else {
      return res.status(201).json({
        message: "Inquiry Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    const id = req.params.id;
    const inquiryData = {
      id: id
    };

    const inquiry = await InquiryService.deleteInquiry(inquiryData);
    res.status(200).json({
      message: "Inquiry Deleted"
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};


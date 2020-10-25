const express = require("express");
const router = express.Router();

const InquiryController = require('./inquiry.controller');

router.get("/institute/:instituteId", InquiryController.getInquiriesByInstituteId);

router.get("/:inquiryId", InquiryController.getInquiry);

router.post("/", InquiryController.createInquiry);

router.put("/", InquiryController.updateInquiry);

router.delete("/:id", InquiryController.deleteInquiry);

module.exports = router;

const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, validate: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/, unique: true },
    gender: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    courses: { type: Array, "default": [], required: true },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
    query: { type: String },
    status: { type: String, enum: ['Active', 'Archieved', 'Deleted'], default: 'Active', required: true }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
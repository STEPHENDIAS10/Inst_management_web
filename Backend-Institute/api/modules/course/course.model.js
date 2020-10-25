const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseName: { type: String, required: true },
    duration: { type: String, required: true },
    value: { type: String, required: true },
    fees: { type: Number, required: true },
    Institute_id: { type: String, required: true },
    status: { type: String, enum : ['Active','Archieved','Deleted'], default: 'Active',required: true}
});

module.exports = mongoose.model('course', courseSchema);
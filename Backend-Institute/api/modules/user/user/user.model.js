const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: {
        type: String,
        required: true,
        validate: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
        unique: true
    },
    password: { type: String, required: true },
    status: { type: String, enum : ['Active','Archieved','Deleted'], default: 'Active',required: true}
});

module.exports = mongoose.model('User', userSchema);
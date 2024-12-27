const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: prop => `${prop.value} is not a valid email address!`
        },
    },
    to: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: prop => `${prop.value} is not a valid email address!`
        },
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

module.exports.Email = mongoose.model('Email', emailSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePhoto:{
        type: String,
        required: true
    }
}, {timestamps:true});

module.exports.User = mongoose.model('Users', userSchema);
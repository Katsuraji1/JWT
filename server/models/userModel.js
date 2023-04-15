const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    passwod: {type: String, required: true},
    isActivate: {type: Boolean, default: false},
    activationLink: {type: String}
})

module.exports = model('User', UserSchema)
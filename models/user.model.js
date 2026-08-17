const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");
const user = new Schema({
    "username": {type: String, unique: true},
    "email": {type: String, unique: true },
    "password": {type: String},
    "role": {type:String, enum:["admin", "user"]},
    "refreshtokenhash": {type: String, default: null}

})
const UserModel = model("users", user);
module.exports = UserModel;
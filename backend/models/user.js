const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserScheme = new Schema({
  username: { type: string, required: true, min: 5, unique: true },
  email: { type: string, required: true},
  password: { type: string, require: true},
});

const UserModel = model("User", UserScheme);


module.exports = UserModel;
const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  userId: { type: String, required: true },
});

const Following = new mongoose.model("Following", followingSchema);

exports.followingSchema = followingSchema;
exports.Following = Following;

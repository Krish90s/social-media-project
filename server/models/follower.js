const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  userId: { type: String, required: true },
});

const Follower = new mongoose.model("Follower", followerSchema);

exports.followerSchema = followerSchema;
exports.Follower = Follower;

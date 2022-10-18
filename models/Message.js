const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: ObjectId, required: true, ref: "User" },
    sender: { type: ObjectId, required: true, ref: "User" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);

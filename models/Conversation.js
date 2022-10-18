const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const conversationSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);

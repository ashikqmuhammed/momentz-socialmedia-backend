const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const postMessage = async (req, res) => {
  try {
    const { text, receiver } = req.body;
    const conversation = await Conversation.findOne({
      members: { $all: [req.user.id, receiver] },
    });
    if (conversation) {
      const savedMessage = await Message.create({
        conversationId: conversation._id,
        sender: req.user.id,
        text,
      });
      res.json(savedMessage);
    } else {
      const newConversation = await Conversation.create({
        members: [req.user.id, receiver],
      });

      const savedMessage = await Message.create({
        conversationId: newConversation._id,
        sender: req.user.id,
        text,
      });
      res.json(savedMessage);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user.id] },
    });

    const arrayPromiseConv = conversations.map((convDoc) => {
      if (convDoc.members[0] !== req.user.id) {
        return User.findById(convDoc.members[0]).select(
          "_id first_name last_name username picture"
        );
      } else {
        return User.findById(convDoc.members[1]).select(
          "_id first_name last_name username picture"
        );
      }
    });
    const resolvedConv = await Promise.all(arrayPromiseConv);
    res.json(resolvedConv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const chatSearch = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "_id first_name last_name username picture"
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { contact } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [req.user.id, contact] },
    });
    if (!conversation) {
      return res.json([]);
    }
    const results = await Message.find({ conversationId: conversation._id });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postMessage,
  getAllConversations,
  chatSearch,
  getAllMessages,
};

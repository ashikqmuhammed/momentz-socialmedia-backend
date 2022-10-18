const express = require("express");
const {
  postMessage,
  chatSearch,
  getAllConversations,
  getAllMessages,
} = require("../controllers/chat");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/messaging", authUser, postMessage);
router.get("/all-chats", authUser, getAllConversations);
router.get("/chat-search/:searchTerm", authUser, chatSearch);
router.get("/all-messages/:contact", authUser, getAllMessages);

module.exports = router;

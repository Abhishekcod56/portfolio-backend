// src/routes/contactRoutes.js

const express = require("express");

const {
  createMessage,
  getMessages,
  getMessageById,
  markMessageAsRead,
  deleteMessage
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.post("/", createMessage);

// Admin protected
router.get("/", authMiddleware, getMessages);
router.get("/:id", authMiddleware, getMessageById);
router.put("/:id/read", authMiddleware, markMessageAsRead);
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;
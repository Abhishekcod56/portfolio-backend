

const pool = require("../config/database");

// CREATE contact message
const createMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO messages
      (
        name,
        email,
        subject,
        message
      )
      VALUES (?, ?, ?, ?)`,
      [
        name,
        email,
        subject || null,
        message
      ]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      messageId: result.insertId
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};

// GET all messages
const getMessages = async (req, res) => {
  try {
    const [messages] = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages"
    });
  }
};

// GET single message
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const [messages] = await pool.query(
      "SELECT * FROM messages WHERE id = ?",
      [id]
    );

    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.json({
      success: true,
      data: messages[0]
    });
  } catch (error) {
    console.error("Get message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch message"
    });
  }
};

// MARK MESSAGE AS READ
const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE messages
       SET is_read = TRUE
       WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.json({
      success: true,
      message: "Message marked as read"
    });
  } catch (error) {
    console.error("Mark message read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message"
    });
  }
};

// DELETE message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM messages WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message"
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  markMessageAsRead,
  deleteMessage
};
// src/controllers/uploadController.js

const path = require("path");
const pool = require("../config/database");

// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const filename = req.file.filename;
    const originalName = req.file.originalname;
    const filePath = `/uploads/${filename}`;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;

    const [result] = await pool.query(
      `INSERT INTO media
      (
        filename,
        original_name,
        file_path,
        file_type,
        file_size
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        filename,
        originalName,
        filePath,
        fileType,
        fileSize
      ]
    );

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        id: result.insertId,
        filename,
        originalName,
        filePath,
        fileType,
        fileSize
      }
    });
  } catch (error) {
    console.error("Upload image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload image"
    });
  }
};

// GET all media
const getMedia = async (req, res) => {
  try {
    const [media] = await pool.query(
      "SELECT * FROM media ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: media.length,
      data: media
    });
  } catch (error) {
    console.error("Get media error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch media"
    });
  }
};

// DELETE media
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const [media] = await pool.query(
      "SELECT * FROM media WHERE id = ?",
      [id]
    );

    if (media.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    const [result] = await pool.query(
      "DELETE FROM media WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    res.json({
      success: true,
      message: "Media deleted successfully"
    });
  } catch (error) {
    console.error("Delete media error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete media"
    });
  }
};

module.exports = {
  uploadImage,
  getMedia,
  deleteMedia
};
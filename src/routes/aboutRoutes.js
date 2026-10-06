// src/routes/aboutRoutes.js

const express = require("express");

const {
  getAbout,
  updateAbout
} = require("../controllers/aboutController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAbout);

router.put("/", authMiddleware, updateAbout);

module.exports = router;
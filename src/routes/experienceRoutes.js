// src/routes/experienceRoutes.js

const express = require("express");

const {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

module.exports = router;
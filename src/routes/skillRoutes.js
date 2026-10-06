// src/routes/skillRoutes.js

const express = require("express");

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkillById);

router.post("/", authMiddleware, createSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
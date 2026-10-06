// src/routes/testimonialRoutes.js

const express = require("express");

const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

router.post("/", authMiddleware, createTestimonial);
router.put("/:id", authMiddleware, updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
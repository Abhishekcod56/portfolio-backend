// src/routes/serviceRoutes.js

const express = require("express");

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);

router.post("/", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
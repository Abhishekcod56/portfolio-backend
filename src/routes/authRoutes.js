const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  getCurrentUser,
  changePassword,
  refreshToken
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.post("/refresh", refreshToken);

router.get("/me", authMiddleware, getCurrentUser);

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
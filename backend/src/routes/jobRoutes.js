const express = require("express");

const router = express.Router();

const { createJob } = require("../controllers/jobController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Recruiter Only
router.post(
  "/",
  protect,
  authorize("recruiter"),
  createJob
);

module.exports = router;
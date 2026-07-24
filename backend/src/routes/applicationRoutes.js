const express = require("express");

const router = express.Router();

const {
  applyForJob,
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Applicant applies to a job
router.post(
  "/apply/:jobId",
  protect,
  authorize("applicant"),
  upload.single("resume"),
  applyForJob
);

module.exports = router;
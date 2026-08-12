const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// =====================================================
// Applicant applies to a job
// =====================================================
router.post(
  "/apply/:jobId",
  protect,
  authorize("applicant"),
  upload.single("resume"),
  applyForJob
);

// =====================================================
// Recruiter gets applicants for a job
// =====================================================
router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getApplicantsByJob
);

// =====================================================
// Recruiter gets single application
// =====================================================
router.get(
  "/:id",
  protect,
  authorize("recruiter"),
  getApplicationById
);

module.exports = router;
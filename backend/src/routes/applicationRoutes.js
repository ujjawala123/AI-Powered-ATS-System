const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
  getMyApplications,
  updateApplicationStatus,
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
// Applicant - Get My Applications
// =====================================================
router.get(
  "/my-applications",
  protect,
  authorize("applicant"),
  getMyApplications
);

// =====================================================
// Recruiter - Get Applicants For A Job
// =====================================================
router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getApplicantsByJob
);

// =====================================================
// Applicant + Recruiter - Get Single Application
// =====================================================
router.get(
  "/:id",
  protect,
  authorize("applicant", "recruiter"),
  getApplicationById
);

// =====================================================
// Recruiter - Update Application Status
// =====================================================
router.patch(
  "/:id/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatus
);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
  getMyApplications,
  updateApplicationStatus,
  getCandidateRanking,
  scheduleInterview,
  getRecruiterDashboard,
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
// Recruiter - Schedule Interview
// =====================================================
router.post(
  "/:id/schedule-interview",
  protect,
  authorize("recruiter"),
  scheduleInterview
);
// =====================================================
// Recruiter - Candidate Ranking
// =====================================================
router.get(
  "/ranking",
  protect,
  authorize("recruiter"),
  getCandidateRanking
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
// Recruiter - Dashboard
// =====================================================

router.get(
  "/recruiter/dashboard",
  protect,
  authorize("recruiter"),
  getRecruiterDashboard
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
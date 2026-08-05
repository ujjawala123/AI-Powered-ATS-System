const express = require("express");
const router = express.Router();

const {
  createJob,
  getMyJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Recruiter
router.post("/", protect, authorize("recruiter"), createJob);

router.get(
  "/my-jobs",
  protect,
  authorize("recruiter"),
  getMyJobs
);

router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorize("recruiter"),
  deleteJob
);

// Public
router.get("/", getAllJobs);

router.get("/:id", getJobById);

module.exports = router;
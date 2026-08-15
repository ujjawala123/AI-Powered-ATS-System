const applicationService = require("../services/applicationService");

// =====================================================
// Apply for Job
// =====================================================
const applyForJob = async (req, res) => {
  try {
    const result = await applicationService.applyForJob(
      req.params.jobId,
      req.user._id,
      req.body,
      req.file
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get Applicants By Job
// =====================================================
const getApplicantsByJob = async (req, res) => {
  try {
    const result =
      await applicationService.getApplicantsByJob(
        req.params.jobId,
        req.user._id
      );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get Single Application
// =====================================================
const getApplicationById = async (req, res) => {
  try {
    const result =
      await applicationService.getApplicationById(
        req.params.id,
        req.user._id,
        req.user.role
      );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Applicant - Get My Applications
// =====================================================
const getMyApplications = async (req, res) => {
  try {
    const result =
      await applicationService.getMyApplications(
        req.user._id
      );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Recruiter - Update Application Status
// =====================================================
const updateApplicationStatus = async (req, res) => {
  try {
    const result =
      await applicationService.updateApplicationStatus(
        req.params.id,
        req.body.status,
        req.user._id
      );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Export Controllers
// =====================================================
module.exports = {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
  getMyApplications,
  updateApplicationStatus,
};
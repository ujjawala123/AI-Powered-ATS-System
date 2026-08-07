const applicationService = require("../services/applicationService");

// ==========================
// Apply for Job
// ==========================
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

// ==========================
// Get Applicants By Job
// ==========================
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

module.exports = {
  applyForJob,
  getApplicantsByJob,
};
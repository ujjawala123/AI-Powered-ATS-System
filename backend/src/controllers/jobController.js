const jobService = require("../services/jobService");

// Create Job
const createJob = async (req, res) => {
  try {
    const result = await jobService.createJob(
      req.body,
      req.user._id
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Recruiter's Jobs
const getMyJobs = async (req, res) => {
  try {
    const result = await jobService.getMyJobs(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const result = await jobService.getAllJobs();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Job By ID
const getJobById = async (req, res) => {
  try {
    const result = await jobService.getJobById(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const result = await jobService.updateJob(
      req.params.id,
      req.body,
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

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const result = await jobService.deleteJob(
      req.params.id,
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
  createJob,
  getMyJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
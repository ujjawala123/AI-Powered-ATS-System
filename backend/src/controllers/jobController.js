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

module.exports = {
  createJob,
};
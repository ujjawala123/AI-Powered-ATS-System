const Job = require("../models/Job");

// Create Job
const createJob = async (jobData, recruiterId) => {
  const job = await Job.create({
    ...jobData,
    postedBy: recruiterId,
  });

  return {
    success: true,
    message: "Job created successfully.",
    data: job,
  };
};

module.exports = {
  createJob,
};
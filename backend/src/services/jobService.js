const mongoose = require("mongoose");
const Job = require("../models/Job");

// ==========================
// Create Job
// ==========================
const createJob = async (jobData, recruiterId) => {
  const job = await Job.create({
    ...jobData,
    postedBy: recruiterId,
    status: "Open",
  });

  return {
    success: true,
    message: "Job created successfully.",
    data: job,
  };
};

// ==========================
// Get Recruiter's Jobs
// ==========================
const getMyJobs = async (recruiterId) => {
  const jobs = await Job.find({
    postedBy: recruiterId,
  }).sort({ createdAt: -1 });

  return {
    success: true,
    data: jobs,
  };
};

// ==========================
// Get All Jobs
// ==========================
const getAllJobs = async () => {
  const jobs = await Job.find({
    status: "Open",
  })
    .populate("postedBy", "name company")
    .sort({ createdAt: -1 });

  return {
    success: true,
    data: jobs,
  };
};

// ==========================
// Get Job By ID
// ==========================
const getJobById = async (jobId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error("Invalid job ID.");
  }

  const job = await Job.findById(jobId).populate(
    "postedBy",
    "name company"
  );

  if (!job) {
    throw new Error("Job not found.");
  }

  return {
    success: true,
    data: job,
  };
};

// ==========================
// Update Job
// ==========================
const updateJob = async (jobId, jobData, recruiterId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error("Invalid job ID.");
  }

  const job = await Job.findOne({
    _id: jobId,
    postedBy: recruiterId,
  });

  if (!job) {
    throw new Error("Job not found.");
  }

  Object.assign(job, jobData);

  await job.save();

  return {
    success: true,
    message: "Job updated successfully.",
    data: job,
  };
};

// ==========================
// Delete Job
// ==========================
const deleteJob = async (jobId, recruiterId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error("Invalid job ID.");
  }

  const job = await Job.findOne({
    _id: jobId,
    postedBy: recruiterId,
  });

  if (!job) {
    throw new Error("Job not found.");
  }

  await job.deleteOne();

  return {
    success: true,
    message: "Job deleted successfully.",
  };
};

module.exports = {
  createJob,
  getMyJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
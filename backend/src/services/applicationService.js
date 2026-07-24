const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a Job
const applyForJob = async (jobId, applicantId, data, resumeFile) => {
  // Check if job exists
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found.");
  }

  // Prevent duplicate applications
  const existingApplication = await Application.findOne({
    job: jobId,
    candidate: applicantId,
  });

  if (existingApplication) {
    throw new Error("You have already applied for this job.");
  }

  // Create application
  const application = await Application.create({
    candidate: applicantId,
    job: jobId,
    coverLetter: data.coverLetter || "",
    resumeURL: resumeFile
      ? `/uploads/resumes/${resumeFile.filename}`
      : "",
  });

  return {
    success: true,
    message: "Application submitted successfully.",
    data: application,
  };
};

module.exports = {
  applyForJob,
};
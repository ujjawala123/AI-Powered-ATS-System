const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");

const { parseResume } = require("./resumeParser");
const { calculateATSScore } = require("./atsService");
const {
  extractCandidateDetails,
} = require("../utils/extractCandidateDetails");

// ==========================
// Apply for a Job
// ==========================
const applyForJob = async (
  jobId,
  applicantId,
  data,
  resumeFile
) => {
  // Check if job exists
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found.");
  }

  // Prevent applying to closed jobs
  if (job.status !== "Open") {
    throw new Error("This job is no longer accepting applications.");
  }

  // Prevent duplicate applications
  const existingApplication = await Application.findOne({
    job: jobId,
    candidate: applicantId,
  });

  if (existingApplication) {
    throw new Error(
      "You have already applied for this job."
    );
  }

  // Parse Resume
  const resumeText = resumeFile
    ? await parseResume(resumeFile)
    : "";

  // Extract Candidate Details
  const candidate = extractCandidateDetails(resumeText);

  // Calculate ATS Score
  const atsResult = calculateATSScore(
    resumeText,
    job.skills || []
  );

  // AI Summary
  const aiSummary = `
ATS Score: ${atsResult.atsScore}%

Matched Skills:
${atsResult.matchedSkills.join(", ") || "None"}

Missing Skills:
${atsResult.missingSkills.join(", ") || "None"}
`.trim();

  // Create Application
  const application = await Application.create({
    candidate: applicantId,
    job: jobId,

    coverLetter: data.coverLetter || "",

    resumeURL: resumeFile
      ? `/uploads/resumes/${resumeFile.filename}`
      : "",

    // Candidate Details
    candidateName: candidate.name || "",
    candidateEmail: candidate.email || "",
    candidatePhone: candidate.phone || "",

    // ATS Details
    matchScore: atsResult.atsScore,
    matchedSkills: atsResult.matchedSkills,
    missingSkills: atsResult.missingSkills,
    aiSummary,
  });

  return {
    success: true,
    message: "Application submitted successfully.",
    data: application,
  };
};

// ==========================
// Get Applicants By Job
// ==========================
const getApplicantsByJob = async (
  jobId,
  recruiterId
) => {
  // Validate Job ID
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error("Invalid job ID.");
  }

  // Check that the job belongs to this recruiter
  const job = await Job.findOne({
    _id: jobId,
    postedBy: recruiterId,
  });

  if (!job) {
    throw new Error(
      "Job not found or you are not authorized to view its applicants."
    );
  }

  // Get applications
  const applications = await Application.find({
    job: jobId,
  })
    .populate(
      "candidate",
      "name email"
    )
    .sort({ createdAt: -1 });

  return {
    success: true,
    data: applications,
  };
};

module.exports = {
  applyForJob,
  getApplicantsByJob,
};
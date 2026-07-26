const Application = require("../models/Application");
const Job = require("../models/Job");

const { parseResume } = require("./resumeParser");
const { calculateATSScore } = require("./atsService");
const {
  extractCandidateDetails,
} = require("../utils/extractCandidateDetails");

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

  // Parse Resume
  const resumeText = resumeFile
    ? await parseResume(resumeFile)
    : "";

  // Extract Candidate Details
  const candidate = extractCandidateDetails(resumeText);

  // Calculate ATS Score
  const atsResult = calculateATSScore(
    resumeText,
    job.skills
  );

  // AI Summary (Temporary)
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
    candidateName: candidate.name,
    candidateEmail: candidate.email,
    candidatePhone: candidate.phone,

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

module.exports = {
  applyForJob,
};
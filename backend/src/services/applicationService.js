const Application = require("../models/Application");
const Job = require("../models/Job");

const { parseResume } = require("./resumeParser");
const { calculateATSScore } = require("./atsService");

const { generateAISummary } = require("./geminiService");

const {
  extractCandidateDetails,
} = require("../utils/extractCandidateDetails");

// =====================================================
// Apply for Job
// =====================================================
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

  // Check if job is open
  if (job.status !== "Open") {
    throw new Error(
      "This job is no longer accepting applications."
    );
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

  // =====================================================
  // Parse Resume
  // =====================================================

  const resumeText = resumeFile
    ? await parseResume(resumeFile)
    : "";

  // =====================================================
  // Extract Candidate Details
  // =====================================================

  const candidate = extractCandidateDetails(resumeText);

  // =====================================================
  // ATS Score
  // =====================================================

  const atsResult = calculateATSScore(
    resumeText,
    job.skills || []
  );

  // =====================================================
  // Gemini AI Analysis
  // =====================================================

  let aiSummary = "";

  try {
    aiSummary = await generateAISummary({
      resumeText,
      jobTitle: job.title,
      jobDescription: job.description,
      matchedSkills: atsResult.matchedSkills,
      missingSkills: atsResult.missingSkills,
      atsScore: atsResult.atsScore,
    });
  } catch (error) {
    console.error(
      "Gemini AI Analysis Error:",
      error.message
    );

    // Don't stop application submission if AI fails
    aiSummary =
      "AI analysis could not be generated at this time.";
  }

  // =====================================================
  // Create Application
  // =====================================================

  const application = await Application.create({
    candidate: applicantId,
    job: jobId,

    coverLetter: data?.coverLetter || "",

    resumeURL: resumeFile
      ? `/uploads/resumes/${resumeFile.filename}`
      : "",

    candidateName: candidate?.name || "",
    candidateEmail: candidate?.email || "",
    candidatePhone: candidate?.phone || "",

    matchScore: atsResult.atsScore,

    matchedSkills: atsResult.matchedSkills,

    missingSkills: atsResult.missingSkills,

    aiSummary,

    status: "Applied",
  });

  return {
    success: true,
    message: "Application submitted successfully.",
    data: application,
  };
};

// =====================================================
// Get Applicants By Job
// =====================================================
const getApplicantsByJob = async (
  jobId,
  recruiterId
) => {
  const job = await Job.findOne({
    _id: jobId,
    postedBy: recruiterId,
  });

  if (!job) {
    throw new Error(
      "Job not found or you are not authorized to view applicants."
    );
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate("candidate", "name email")
    .populate("job", "title company")
    .sort({
      matchScore: -1,
      createdAt: -1,
    });

  return {
    success: true,
    data: applications,
  };
};

// =====================================================
// Get Single Application By ID
// =====================================================
const getApplicationById = async (
  applicationId,
  userId,
  userRole
) => {
  const application = await Application.findById(
    applicationId
  )
    .populate("candidate", "name email")
    .populate(
      "job",
      "title company postedBy"
    );

  if (!application) {
    throw new Error("Application not found.");
  }

  // Recruiter authorization
  if (userRole === "recruiter") {
    if (
      !application.job ||
      application.job.postedBy.toString() !==
        userId.toString()
    ) {
      throw new Error(
        "You are not authorized to view this application."
      );
    }
  }

  // Applicant authorization
  if (userRole === "applicant") {
    if (
      application.candidate._id.toString() !==
      userId.toString()
    ) {
      throw new Error(
        "You are not authorized to view this application."
      );
    }
  }

  return {
    success: true,
    data: application,
  };
};

// =====================================================
// Update Application Status
// =====================================================
const updateApplicationStatus = async (
  applicationId,
  status,
  recruiterId
) => {
  const allowedStatuses = [
    "Applied",
    "Shortlisted",
    "Interview",
    "Offered",
    "Rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      "Invalid application status."
    );
  }

  const application = await Application.findById(
    applicationId
  ).populate(
    "job",
    "title company postedBy"
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  if (
    application.job.postedBy.toString() !==
    recruiterId.toString()
  ) {
    throw new Error(
      "You are not authorized to update this application."
    );
  }

  application.status = status;

  await application.save();

  return {
    success: true,
    message:
      "Application status updated successfully.",
    data: application,
  };
};

// =====================================================
// Get Applicant's Applications
// =====================================================
const getMyApplications = async (
  applicantId
) => {
  const applications = await Application.find({
    candidate: applicantId,
  })
    .populate(
      "job",
      "title company location employmentType"
    )
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    data: applications,
  };
};

// =====================================================
// Export
// =====================================================
module.exports = {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
  updateApplicationStatus,
  getMyApplications,
};
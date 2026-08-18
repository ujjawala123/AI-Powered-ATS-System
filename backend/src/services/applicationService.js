const Application = require("../models/Application");
const Job = require("../models/Job");

const { parseResume } = require("./resumeParser");
const { calculateATSScore } = require("./atsService");
const { generateAISummary } = require("./geminiService");

const {
  extractCandidateDetails,
} = require("../utils/extractCandidateDetails");
const {
  sendStatusUpdateEmail,
  sendInterviewInvitationEmail,
} = require("./emailService");

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

    // Candidate information
    candidateName: candidate?.name || "",
    candidateEmail: candidate?.email || "",
    candidatePhone: candidate?.phone || "",

    // Experience extracted from resume
    experience: candidate?.experience || 0,

    // ATS information
    matchScore: atsResult.atsScore,
    matchedSkills: atsResult.matchedSkills,
    missingSkills: atsResult.missingSkills,

    // AI analysis
    aiSummary,

    // Initial application status
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
  // =====================================================
  // Allowed Statuses
  // =====================================================

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

  // =====================================================
  // Find Application
  // =====================================================

  const application =
    await Application.findById(applicationId).populate(
    
    "candidate",
    "name email"
  )
   .populate(
      "job",
      "title company postedBy"
    );

  if (!application) {
    throw new Error(
      "Application not found."
    );
  }

  // =====================================================
  // Recruiter Authorization
  // =====================================================

  if (
    !application.job ||
    application.job.postedBy.toString() !==
      recruiterId.toString()
  ) {
    throw new Error(
      "You are not authorized to update this application."
    );
  }

  // =====================================================
  // Update Status
  // =====================================================

  application.status = status;

  await application.save();

  // =====================================================
  // Send Status Update Email
  // =====================================================

 try {
  const candidateEmail =
    application.candidateEmail ||
    application.candidate?.email ||
    "";

  const candidateName =
    application.candidate?.name ||
  application.candidateName ||
    "Candidate";

  if (!candidateEmail) {
    console.log(
      "No candidate email found. Status email was not sent."
    );
  } else {
    await sendStatusUpdateEmail({
      candidateEmail,
      candidateName,
      jobTitle:
        application.job?.title || "Job Position",
      status,
    });

    console.log(
      `Status email sent to ${candidateEmail}`
    );
  }
} catch (emailError) {
  console.error(
    "Status email failed:",
    emailError.message
  );
}

  // =====================================================
  // Return Updated Application
  // =====================================================

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
// Recruiter - Candidate Ranking
// =====================================================
// const getCandidateRanking = async (
//   recruiterId,
//   minScore = 0,
//   skills = [],
//   minExperience = 0
// ) => {
//   // Find all jobs posted by this recruiter
//   const recruiterJobs = await Job.find({
//     postedBy: recruiterId,
//   }).select("_id");

//   const jobIds = recruiterJobs.map(
//     (job) => job._id
//   );

//   // Build filter
//   const filter = {
//     job: { $in: jobIds },
//     matchScore: {
//       $gte: Number(minScore) || 0,
//     },
//     experience: {
//       $gte: Number(minExperience) || 0,
//     },
//   };

//   // Filter by skills if provided
//   if (skills.length > 0) {
//     filter.matchedSkills = {
//       $all: skills,
//     };
//   }

//   // Get ranked applications
//   const applications = await Application.find(filter)
//     .populate(
//       "candidate",
//       "name email"
//     )
//     .populate(
//       "job",
//       "title company"
//     )
//     .sort({
//       matchScore: -1,
//       experience: -1,
//       createdAt: -1,
//     });

//   return {
//     success: true,
//     count: applications.length,
//     data: applications,
//   };
// };

// =====================================================
// Recruiter - Candidate Ranking
// Advanced filtering by ATS score, skills and experience
// =====================================================
const getCandidateRanking = async (recruiterId, filters = {}) => {
  
  const minScore =
    filters.minScore !== undefined && filters.minScore !== ""
      ? Number(filters.minScore)
      : 0;

  const minExperience =
    filters.minExperience !== undefined &&
    filters.minExperience !== ""
      ? Number(filters.minExperience)
      : 0;

  const skills = filters.skills
    ? filters.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean)
    : [];

  // =====================================================
  // Validate Numbers
  // =====================================================

  const validMinScore = Number.isNaN(minScore)
    ? 0
    : minScore;

  const validMinExperience = Number.isNaN(minExperience)
    ? 0
    : minExperience;

  // =====================================================
  // Get All Jobs Posted By Recruiter
  // =====================================================

  const jobs = await Job.find({
    postedBy: recruiterId,
  }).select("_id title company");

  if (!jobs.length) {
    return {
      success: true,
      data: [],
    };
  }

  const jobIds = jobs.map((job) => job._id);

  // =====================================================
  // Build Application Query
  // =====================================================

  const query = {
    job: {
      $in: jobIds,
    },

    matchScore: {
      $gte: validMinScore,
    },
  };

  // =====================================================
  // Experience Filter
  // =====================================================

  if (validMinExperience > 0) {
    query.experience = {
      $gte: validMinExperience,
    };
  }

  // =====================================================
  // Get Applications
  // =====================================================

  let applications = await Application.find(query)
    .populate("candidate", "name email")
    .populate("job", "title company")
    .sort({
      matchScore: -1,
      experience: -1,
      createdAt: -1,
    });

  // =====================================================
  // Skills Filter
  // =====================================================

  if (skills.length > 0) {
    applications = applications.filter((application) => {
      const matchedSkills = (
        application.matchedSkills || []
      ).map((skill) =>
        String(skill).trim().toLowerCase()
      );

      // Candidate must have ALL requested skills
      return skills.every((requiredSkill) =>
        matchedSkills.some(
          (matchedSkill) =>
            matchedSkill.includes(requiredSkill) ||
            requiredSkill.includes(matchedSkill)
        )
      );
    });
  }

  // =====================================================
  // Return Ranked Candidates
  // =====================================================

  return {
    success: true,
    data: applications,
  };
};
// =====================================================
// Recruiter - Dashboard
// =====================================================
const getRecruiterDashboard = async (recruiterId) => {
  // =====================================================
  // Get jobs posted by logged-in recruiter
  // =====================================================

  const jobs = await Job.find({
    postedBy: recruiterId,
  }).sort({
    createdAt: -1,
  });

  // =====================================================
  // Get Job IDs
  // =====================================================

  const jobIds = jobs.map((job) => job._id);

  // =====================================================
  // Get Applications For Recruiter's Jobs
  // =====================================================

  const applications = await Application.find({
    job: {
      $in: jobIds,
    },
  });

  // =====================================================
  // Statistics
  // =====================================================

  const jobsPosted = jobs.length;

  const totalApplications =
    applications.length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const hired = applications.filter(
    (application) =>
      application.status === "Offered"
  ).length;

  // =====================================================
  // Recent Jobs
  // =====================================================

  const recentJobs = jobs
    .slice(0, 5)
    .map((job) => {
      const applicantCount =
        applications.filter(
          (application) =>
            application.job.toString() ===
            job._id.toString()
        ).length;

      return {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        employmentType: job.employmentType,
        status: job.status,
        applicants: applicantCount,
        createdAt: job.createdAt,
      };
    });

  // =====================================================
  // Return Dashboard Data
  // =====================================================

  return {
    success: true,

    stats: {
      jobsPosted,
      applications: totalApplications,
      interviews,
      hired,
    },

    jobs: recentJobs,
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
  getCandidateRanking,
  getRecruiterDashboard,
};
const applicationService = require("../services/applicationService");

const {
  sendInterviewInvitationEmail,
} = require("../services/emailService");

const Job = require("../models/Job");
const Application = require("../models/Application");

// =====================================================
// Apply for Job
// =====================================================
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
    console.error("Apply for job error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get Applicants By Job
// =====================================================
const getApplicantsByJob = async (req, res) => {
  try {
    const result = await applicationService.getApplicantsByJob(
      req.params.jobId,
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get applicants error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Get Single Application
// =====================================================
const getApplicationById = async (req, res) => {
  try {
    const result = await applicationService.getApplicationById(
      req.params.id,
      req.user._id,
      req.user.role
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Get application details error:",
      error
    );

    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Applicant - Get My Applications
// =====================================================
const getMyApplications = async (req, res) => {
  try {
    const result = await applicationService.getMyApplications(
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Get my applications error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Recruiter - Update Application Status
// =====================================================
const updateApplicationStatus = async (req, res) => {
  try {
    const result =
      await applicationService.updateApplicationStatus(
        req.params.id,
        req.body.status,
        req.user._id
      );

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Update application status error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Recruiter - Schedule Interview
// =====================================================
const scheduleInterview = async (req, res) => {
  try {
    const {
      interviewDate,
      interviewTime,
      interviewLink,
      interviewNotes,
    } = req.body;

    if (!interviewDate) {
      return res.status(400).json({
        success: false,
        message: "Interview date is required.",
      });
    }

    if (!interviewTime) {
      return res.status(400).json({
        success: false,
        message: "Interview time is required.",
      });
    }

    const application =
      await applicationService.getApplicationById(
        req.params.id,
        req.user._id,
        "recruiter"
      );

    if (!application || !application.data) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    const applicationData = application.data;

    applicationData.interviewDate = interviewDate;
    applicationData.interviewTime = interviewTime;
    applicationData.interviewLink =
      interviewLink || "";
    applicationData.interviewNotes =
      interviewNotes || "";

    applicationData.status = "Interview";

    await applicationData.save();

    try {
      await sendInterviewInvitationEmail({
        candidateEmail:
          applicationData.candidateEmail ||
          applicationData.candidate?.email,

        candidateName:
          applicationData.candidateName ||
          applicationData.candidate?.name ||
          "Candidate",

        jobTitle:
          applicationData.job?.title ||
          "Job Position",

        interviewDate,
        interviewTime,
        interviewLink: interviewLink || "",
      });

      console.log(
        `Interview invitation sent to ${
          applicationData.candidateEmail ||
          applicationData.candidate?.email ||
          ""
        }`
      );
    } catch (emailError) {
      console.error(
        "Interview email failed:",
        emailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Interview scheduled successfully.",
      data: applicationData,
    });
  } catch (error) {
    console.error(
      "Schedule interview error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Recruiter - Candidate Ranking
// =====================================================
const getCandidateRanking = async (req, res) => {
  try {
    const filters = {
      minScore: req.query.minScore,
      minExperience: req.query.minExperience,
      skills: req.query.skills,
    };

    const result =
      await applicationService.getCandidateRanking(
        req.user._id,
        filters
      );

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Get candidate ranking error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// Recruiter - Dashboard
// =====================================================
const getRecruiterDashboard = async (req, res) => {
  try {
    // Get only jobs belonging to logged-in recruiter
    const jobs = await Job.find({
      postedBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const jobIds = jobs.map((job) => job._id);

    // Get applications belonging to recruiter's jobs
    const applications = await Application.find({
      job: {
        $in: jobIds,
      },
    });

    // -----------------------------
    // Statistics
    // -----------------------------

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

    // -----------------------------
    // Recent jobs
    // -----------------------------

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
          status: job.status,
          applicants: applicantCount,
          createdAt: job.createdAt,
        };
      });

    return res.status(200).json({
      success: true,

      stats: {
        jobsPosted,
        applications: totalApplications,
        interviews,
        hired,
      },

      jobs: recentJobs,
    });
  } catch (error) {
    console.error(
      "Recruiter dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load recruiter dashboard.",
      error: error.message,
    });
  }
};

// =====================================================
// Export Controllers
// =====================================================
module.exports = {
  applyForJob,
  getApplicantsByJob,
  getApplicationById,
  getMyApplications,
  updateApplicationStatus,
  getCandidateRanking,
  scheduleInterview,
  getRecruiterDashboard,
};
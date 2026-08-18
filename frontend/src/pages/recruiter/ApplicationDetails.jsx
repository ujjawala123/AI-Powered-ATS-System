import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaRobot,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/applications/${id}`);

      setApplication(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load application"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <p className="text-zinc-400">
          Loading application...
        </p>
      </div>
    );
  }

  // ==========================================
  // Not Found
  // ==========================================

  if (!application) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-5xl mx-auto text-center py-20">

          <h1 className="text-2xl font-bold">
            Application not found
          </h1>

          <Link
            to="/recruiter/jobs"
            className="
              inline-flex items-center gap-2
              mt-6
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              px-5 py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            <FaArrowLeft />
            Back to My Jobs
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // Candidate Information
  // ==========================================

  const candidateName =
    application.candidate?.name ||
    application.candidateName ||
    "Unknown Candidate";

  const candidateEmail =
    application.candidateEmail ||
    application.candidate?.email ||
    "Not provided";

  const candidatePhone =
    application.candidatePhone ||
    "Not provided";

  // ==========================================
  // Job Information
  // ==========================================

  const jobId =
    typeof application.job === "object"
      ? application.job?._id
      : application.job;

  const jobTitle =
    application.job?.title ||
    "Job Application";

  const company =
    application.job?.company ||
    "Company";

  // ==========================================
  // ATS Score
  // ==========================================

  const score = application.matchScore || 0;

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Moderate Match";
    return "Low Match";
  };

  // ==========================================
  // Status Styling
  // ==========================================

  const getStatusStyle = () => {
    switch (application.status) {
      case "Shortlisted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

      case "Interview":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20";

      case "Offered":
        return "bg-green-500/20 text-green-400 border-green-500/20";

      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/20";

      default:
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            Back
        ========================================== */}

        <Link
          to={
            jobId
              ? `/recruiter/jobs/${jobId}/applicants`
              : "/recruiter/jobs"
          }
          className="
            inline-flex items-center gap-2
            text-zinc-400
            hover:text-white
            mb-8
            transition
          "
        >
          <FaArrowLeft />
          Back to Applicants
        </Link>


        {/* ==========================================
            Header
        ========================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <FaBriefcase className="text-cyan-400 text-xl" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  {company}
                </p>

                <p className="text-sm text-zinc-400">
                  {jobTitle}
                </p>
              </div>

            </div>

            <h1 className="text-4xl font-bold mt-5">
              {candidateName}
            </h1>

            <p className="text-zinc-400 mt-2">
              Candidate Application
            </p>

          </div>

{/* ==========================================
    Schedule Interview
========================================== */}

{application.status !== "Rejected" &&
 application.status !== "Offered" && (
  <div className="flex justify-end mb-6">

    <button
      type="button"
      onClick={() =>
        navigate(
          `/recruiter/applications/${application._id}/schedule-interview`
        )
      }
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        bg-cyan-500
        hover:bg-cyan-400
        text-black
        px-5
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >
      <FaCalendarAlt />
      Schedule Interview
    </button>

  </div>
)}

          <span
            className={`
              px-4 py-2
              rounded-full
              border
              text-sm
              font-semibold
              w-fit
              ${getStatusStyle()}
            `}
          >
            {application.status || "Applied"}
          </span>

        </div>


        {/* ==========================================
            Candidate Information
        ========================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-6">
            Candidate Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-zinc-500 text-sm">
                Name
              </p>

              <p className="mt-1 font-medium">
                {candidateName}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Email
              </p>

              <p className="mt-1 break-all font-medium">
                {candidateEmail}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Phone
              </p>

              <p className="mt-1 font-medium">
                {candidatePhone}
              </p>
            </div>

          </div>

        </div>


        {/* ==========================================
            ATS Analysis
        ========================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <FaRobot className="text-cyan-400 text-xl" />

            <h2 className="text-2xl font-semibold">
              ATS Analysis
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {/* Score */}

            <div className="bg-zinc-800 rounded-xl p-6 text-center">

              <p className="text-zinc-400 text-sm">
                ATS Match Score
              </p>

              <p className="text-5xl font-bold text-cyan-400 mt-3">
                {score}%
              </p>

              <p className="text-sm text-zinc-500 mt-2">
                {getScoreLabel()}
              </p>

            </div>


            {/* Matched */}

            <div className="bg-zinc-800 rounded-xl p-6">

              <div className="flex items-center gap-2">

                <FaCheckCircle className="text-green-400" />

                <p className="text-zinc-400">
                  Matched Skills
                </p>

              </div>

              <p className="text-3xl font-bold mt-3">
                {application.matchedSkills?.length || 0}
              </p>

            </div>


            {/* Missing */}

            <div className="bg-zinc-800 rounded-xl p-6">

              <div className="flex items-center gap-2">

                <FaTimesCircle className="text-red-400" />

                <p className="text-zinc-400">
                  Missing Skills
                </p>

              </div>

              <p className="text-3xl font-bold mt-3">
                {application.missingSkills?.length || 0}
              </p>

            </div>

          </div>

        </div>


        {/* ==========================================
            Skills
        ========================================== */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Matched */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Matched Skills
            </h2>

            {application.matchedSkills?.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {application.matchedSkills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="
                        px-3 py-2
                        rounded-lg
                        bg-green-500/10
                        border border-green-500/20
                        text-green-400
                        text-sm
                      "
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            ) : (

              <p className="text-zinc-500">
                No matched skills.
              </p>

            )}

          </div>


          {/* Missing */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Missing Skills
            </h2>

            {application.missingSkills?.length > 0 ? (

              <div className="flex flex-wrap gap-2">

                {application.missingSkills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="
                        px-3 py-2
                        rounded-lg
                        bg-red-500/10
                        border border-red-500/20
                        text-red-400
                        text-sm
                      "
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            ) : (

              <p className="text-green-400">
                No missing skills 🎉
              </p>

            )}

          </div>

        </div>


        {/* ==========================================
            Gemini AI Analysis
        ========================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <FaRobot className="text-cyan-400" />
            </div>

            <div>

              <h2 className="text-2xl font-semibold">
                AI Candidate Assessment
              </h2>

              <p className="text-sm text-zinc-500">
                Generated using Gemini AI
              </p>

            </div>

          </div>


          <div className="bg-zinc-800/50 border border-zinc-800 rounded-xl p-6">

            <p className="text-zinc-300 leading-8 whitespace-pre-line">
              {application.aiSummary ||
                "No AI analysis available."}
            </p>

          </div>

        </div>


        {/* ==========================================
            Cover Letter
        ========================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Cover Letter
          </h2>

          <p className="text-zinc-400 leading-7 whitespace-pre-line">
            {application.coverLetter ||
              "No cover letter provided."}
          </p>

        </div>


        {/* ==========================================
            Resume
        ========================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Resume
          </h2>

          {application.resumeURL ? (

            <a
              href={`http://localhost:5000${application.resumeURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-5 py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              <FaFileAlt />
              View Resume
            </a>

          ) : (

            <p className="text-zinc-500">
              No resume uploaded.
            </p>

          )}

        </div>

      </div>

    </div>
  );
};

export default ApplicationDetails;
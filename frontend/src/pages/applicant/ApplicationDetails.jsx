import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileAlt,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";

const ApplicationDetails = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/applications/${id}`
      );

      setApplication(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load application."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <p className="text-zinc-400">
          Loading application...
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-5xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold">
            Application not found
          </h1>

          <Link
            to="/applicant/applications"
            className="inline-flex items-center gap-2 mt-6 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-lg font-semibold"
          >
            <FaArrowLeft />
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const job = application.job;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Interview":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "Offered":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to="/applicant/applications"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <FaArrowLeft />
          Back to Applications
        </Link>

        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold">
                {job?.title || "Job Application"}
              </h1>

              <p className="text-zinc-400 mt-2">
                {job?.company || "Company"}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full border font-semibold w-fit ${getStatusStyle(
                application.status
              )}`}
            >
              {application.status || "Applied"}
            </span>

          </div>

        </div>

        {/* Job Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-6">
            Job Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-zinc-500 text-sm">
                Position
              </p>

              <p className="mt-1 font-medium">
                {job?.title || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Company
              </p>

              <p className="mt-1 font-medium">
                {job?.company || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Applied On
              </p>

              <p className="mt-1 font-medium">
                {application.createdAt
                  ? new Date(
                      application.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

          </div>

        </div>

        {/* ATS Analysis */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-cyan-400" />

            <h2 className="text-2xl font-semibold">
              ATS Analysis
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Score */}
            <div className="bg-zinc-800 rounded-xl p-6 text-center min-w-[180px]">

              <p className="text-zinc-400">
                ATS Match Score
              </p>

              <p className="text-5xl font-bold text-cyan-400 mt-3">
                {application.matchScore || 0}%
              </p>

            </div>

            {/* Summary */}
            <div className="flex-1">

              <h3 className="text-lg font-semibold mb-3">
                AI Assessment
              </h3>

              <div className="text-zinc-400 leading-7 whitespace-pre-line">
                {application.aiSummary ||
                  "AI assessment is not available."}
              </div>

            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Matched */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-green-400" />

              <h2 className="text-xl font-semibold">
                Matched Skills
              </h2>
            </div>

            {application.matchedSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {application.matchedSkills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
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

            <div className="flex items-center gap-2 mb-4">
              <FaTimesCircle className="text-red-400" />

              <h2 className="text-xl font-semibold">
                Missing Skills
              </h2>
            </div>

            {application.missingSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {application.missingSkills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>
            ) : (
              <p className="text-zinc-500">
                No missing skills.
              </p>
            )}

          </div>

        </div>

        {/* Cover Letter */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Cover Letter
          </h2>

          <p className="text-zinc-400 leading-7 whitespace-pre-line">
            {application.coverLetter ||
              "No cover letter provided."}
          </p>

        </div>

        {/* Resume */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Resume
          </h2>

          {application.resumeURL ? (
            <a
              href={`http://localhost:5000${application.resumeURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-lg font-semibold transition"
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
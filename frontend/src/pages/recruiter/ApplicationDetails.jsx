import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
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
          "Failed to load application"
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
            to="/recruiter/jobs"
            className="inline-flex items-center gap-2 mt-6 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg"
          >
            <FaArrowLeft />
            Back to My Jobs
          </Link>
        </div>
      </div>
    );
  }

  const candidateName =
    application.candidateName ||
    application.candidate?.name ||
    "Unknown Candidate";

  const candidateEmail =
    application.candidateEmail ||
    application.candidate?.email ||
    "Not provided";

  const candidatePhone =
    application.candidatePhone || "Not provided";

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to={`/recruiter/jobs/${application.job}/applicants`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <FaArrowLeft />
          Back to Applicants
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              {candidateName}
            </h1>

            <p className="text-zinc-400 mt-2">
              Candidate Application
            </p>
          </div>

          <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 w-fit">
            {application.status || "Applied"}
          </span>

        </div>

        {/* Candidate Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-6">
            Candidate Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-zinc-500 text-sm">
                Name
              </p>

              <p className="mt-1">
                {candidateName}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Email
              </p>

              <p className="mt-1 break-all">
                {candidateEmail}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">
                Phone
              </p>

              <p className="mt-1">
                {candidatePhone}
              </p>
            </div>

          </div>
        </div>

        {/* ATS Score */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-6">
            ATS Analysis
          </h2>

          <div className="flex flex-col md:flex-row gap-8">

            <div className="bg-zinc-800 rounded-xl p-6 text-center min-w-[180px]">

              <p className="text-zinc-400">
                ATS Match Score
              </p>

              <p className="text-5xl font-bold text-cyan-400 mt-3">
                {application.matchScore || 0}%
              </p>

            </div>

            <div className="flex-1">

              <h3 className="text-lg font-semibold mb-3">
                AI Summary
              </h3>

              <p className="text-zinc-400 leading-7">
                {application.aiSummary ||
                  "No AI summary available."}
              </p>

            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

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
                      className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm"
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
                      className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm"
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
              className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
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

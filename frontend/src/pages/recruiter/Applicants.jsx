import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

import { getApplicantsByJob } from "../../services/applicationService";

const Applicants = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const response = await getApplicantsByJob(id);

      setApplications(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-5 transition"
          >
            <FaArrowLeft />
            Back to My Jobs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-4xl font-bold">
                Job Applicants
              </h1>

              <p className="text-zinc-400 mt-2">
                Review candidates who applied for this job.
              </p>
            </div>

            <span className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-zinc-300 w-fit">
              {applications.length} Applicant
              {applications.length !== 1 ? "s" : ""}
            </span>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-400">
              Loading applicants...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && applications.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

            <h2 className="text-xl font-semibold">
              No applicants yet
            </h2>

            <p className="text-zinc-500 mt-2">
              Applications for this job will appear here.
            </p>

          </div>
        )}

        {/* Applicants */}
        {!loading && applications.length > 0 && (
          <div className="space-y-5">

            {applications.map((application) => {

              const candidateName =
                application.candidateName ||
                application.candidate?.name ||
                "Unknown Candidate";

              const candidateEmail =
                application.candidateEmail ||
                application.candidate?.email ||
                "No email";

              return (
                <div
                  key={application._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Candidate */}
                    <div className="min-w-0">

                      <h2 className="text-2xl font-semibold truncate">
                        {candidateName}
                      </h2>

                      <p className="text-zinc-400 mt-1 break-all">
                        {candidateEmail}
                      </p>

                      {application.candidatePhone && (
                        <p className="text-zinc-500 mt-1">
                          {application.candidatePhone}
                        </p>
                      )}

                    </div>

                    {/* ATS Score */}
                    <div className="text-center min-w-[100px]">

                      <p className="text-sm text-zinc-500">
                        ATS Score
                      </p>

                      <p className="text-3xl font-bold text-cyan-400">
                        {application.matchScore || 0}%
                      </p>

                    </div>

                    {/* Status */}
                    <div className="min-w-[110px]">

                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          application.status === "Applied"
                            ? "bg-blue-500/20 text-blue-400"
                            : application.status === "Shortlisted"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : application.status === "Interview"
                            ? "bg-purple-500/20 text-purple-400"
                            : application.status === "Offered"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {application.status || "Applied"}
                      </span>

                    </div>

                    {/* View */}
                    <Link
                      to={`/recruiter/applications/${application._id}`}
                      className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold transition"
                    >
                      <FaEye />
                      View
                    </Link>

                  </div>

                  {/* Matched Skills */}
                  <div className="mt-6 pt-5 border-t border-zinc-800">

                    <p className="text-sm text-zinc-500 mb-3">
                      Matched Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {application.matchedSkills?.length > 0 ? (
                        application.matchedSkills.map(
                          (skill, index) => (
                            <span
                              key={index}
                              className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-zinc-600">
                          No matched skills
                        </span>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default Applicants;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEye,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/applications/my-applications"
      );

      setApplications(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <p className="text-zinc-400">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="text-zinc-400 mt-2">
            Track the jobs you have applied for.
          </p>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

            <FaBriefcase className="text-4xl text-zinc-600 mx-auto mb-4" />

            <h2 className="text-xl font-semibold">
              No Applications Yet
            </h2>

            <p className="text-zinc-500 mt-2 mb-6">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/applicant/jobs"
              className="
                inline-flex
                items-center
                gap-2
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-5
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              <FaBriefcase />
              Browse Jobs
            </Link>

          </div>
        ) : (

          /* Applications List */
          <div className="space-y-4">

            {applications.map((application) => (

              <div
                key={application._id}
                className="
                  bg-zinc-900
                  border border-zinc-800
                  hover:border-zinc-700
                  rounded-2xl
                  p-6
                  transition
                "
              >

                <div className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  gap-6
                ">

                  {/* Job Information */}
                  <div className="flex-1">

                    <div className="flex items-start gap-4">

                      <div className="
                        w-12
                        h-12
                        rounded-xl
                        bg-cyan-500/10
                        flex
                        items-center
                        justify-center
                        shrink-0
                      ">
                        <FaBriefcase className="text-cyan-400" />
                      </div>

                      <div>

                        <h2 className="text-xl font-semibold">
                          {application.job?.title ||
                            "Job Title"}
                        </h2>

                        <p className="text-zinc-400 mt-1">
                          {application.job?.company ||
                            "Company"}
                        </p>

                        <div className="
                          flex
                          flex-wrap
                          gap-4
                          mt-3
                          text-sm
                          text-zinc-500
                        ">

                          {application.job?.location && (
                            <span>
                              📍 {application.job.location}
                            </span>
                          )}

                          {application.job?.employmentType && (
                            <span>
                              💼{" "}
                              {application.job.employmentType}
                            </span>
                          )}

                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />

                            {application.createdAt
                              ? new Date(
                                  application.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ATS Score */}
                  <div className="text-center min-w-[110px]">

                    <div className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-zinc-500
                      text-sm
                    ">
                      <FaChartLine />
                      ATS Score
                    </div>

                    <p className="
                      text-2xl
                      font-bold
                      text-cyan-400
                      mt-1
                    ">
                      {application.matchScore || 0}%
                    </p>

                  </div>

                  {/* Status */}
                  <div className="min-w-[120px]">

                    <span
                      className={`
                        inline-flex
                        px-4
                        py-2
                        rounded-full
                        border
                        text-sm
                        font-semibold
                        ${getStatusStyle(
                          application.status
                        )}
                      `}
                    >
                      {application.status || "Applied"}
                    </span>

                  </div>

                  {/* View Application */}
                  <div>

                    <Link
                      to={`/applicant/applications/${application._id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        bg-zinc-800
                        hover:bg-zinc-700
                        text-white
                        transition
                      "
                    >
                      <FaEye />
                      View
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Applications;
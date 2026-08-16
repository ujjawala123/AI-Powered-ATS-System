import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaUser,
  FaEnvelope,
  FaChartLine,
  FaSyncAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getMyJobs } from "../../services/jobService";
import api from "../../services/api";

const statuses = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
];

const ApplicationPipeline = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  // =====================================================
  // Fetch all applications from recruiter's jobs
  // =====================================================
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const jobsResponse = await getMyJobs();
      const jobs = jobsResponse.data || [];

      let allApplications = [];

      for (const job of jobs) {
        try {
          const response = await api.get(
            `/applications/job/${job._id}`
          );

          const jobApplications =
            response.data.data || [];

          allApplications = [
            ...allApplications,
            ...jobApplications,
          ];
        } catch (error) {
          console.error(
            `Failed to load applications for job ${job._id}`,
            error
          );
        }
      }

      setApplications(allApplications);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load application pipeline."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Update application status
  // =====================================================
  const handleStatusChange = async (
    applicationId,
    newStatus
  ) => {
    try {
      setUpdatingId(applicationId);

      const response = await api.patch(
        `/applications/${applicationId}/status`,
        {
          status: newStatus,
        }
      );

      const updatedApplication =
        response.data.data;

      // Update UI immediately
      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status:
                  updatedApplication.status ||
                  newStatus,
              }
            : application
        )
      );

      toast.success(
        `Application moved to ${newStatus}.`
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // Filter applications by status
  // =====================================================
  const getApplicationsByStatus = (status) => {
    return applications.filter(
      (application) =>
        (application.status || "Applied") === status
    );
  };

  // =====================================================
  // Column styles
  // =====================================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "border-cyan-500/20 bg-cyan-500/5";

      case "Shortlisted":
        return "border-yellow-500/20 bg-yellow-500/5";

      case "Interview":
        return "border-purple-500/20 bg-purple-500/5";

      case "Offered":
        return "border-green-500/20 bg-green-500/5";

      case "Rejected":
        return "border-red-500/20 bg-red-500/5";

      default:
        return "border-zinc-800 bg-zinc-900";
    }
  };

  // =====================================================
  // Status text styles
  // =====================================================
  const getStatusTextStyle = (status) => {
    switch (status) {
      case "Applied":
        return "text-cyan-400";

      case "Shortlisted":
        return "text-yellow-400";

      case "Interview":
        return "text-purple-400";

      case "Offered":
        return "text-green-400";

      case "Rejected":
        return "text-red-400";

      default:
        return "text-zinc-400";
    }
  };

  // =====================================================
  // Loading
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <div className="text-center">
          <FaSyncAlt className="text-cyan-400 text-2xl animate-spin mx-auto mb-4" />

          <p className="text-zinc-400">
            Loading application pipeline...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-6 md:p-8">
      <div className="max-w-[1600px] mx-auto">

        {/* =====================================================
            Header
        ===================================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Application Pipeline
            </h1>

            <p className="text-zinc-400 mt-2">
              Track and manage candidates through the
              recruitment process.
            </p>
          </div>

          <button
            onClick={fetchApplications}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-zinc-800
              hover:bg-zinc-700
              border
              border-zinc-700
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>

        {/* =====================================================
            Summary
        ===================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          {statuses.map((status) => (
            <div
              key={status}
              className={`
                rounded-xl
                border
                p-4
                ${getStatusStyle(status)}
              `}
            >
              <p className="text-sm text-zinc-500">
                {status}
              </p>

              <p
                className={`
                  text-2xl
                  font-bold
                  mt-1
                  ${getStatusTextStyle(status)}
                `}
              >
                {getApplicationsByStatus(status).length}
              </p>
            </div>
          ))}

        </div>

        {/* =====================================================
            Pipeline
        ===================================================== */}
        <div className="flex gap-5 overflow-x-auto pb-6">

          {statuses.map((status) => {
            const statusApplications =
              getApplicationsByStatus(status);

            return (
              <div
                key={status}
                className="
                  min-w-[300px]
                  w-[300px]
                  flex-shrink-0
                "
              >

                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-2">

                    <h2 className="font-semibold">
                      {status}
                    </h2>

                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
                      {statusApplications.length}
                    </span>

                  </div>

                </div>

                {/* Cards */}
                <div className="space-y-4">

                  {statusApplications.length === 0 ? (
                    <div
                      className="
                        border
                        border-dashed
                        border-zinc-800
                        rounded-xl
                        p-8
                        text-center
                      "
                    >
                      <p className="text-sm text-zinc-600">
                        No applications
                      </p>
                    </div>
                  ) : (
                    statusApplications.map(
                      (application) => {

                        const candidateName =
                          application.candidateName ||
                          application.candidate?.name ||
                          "Unknown Candidate";

                        const candidateEmail =
                          application.candidateEmail ||
                          application.candidate?.email ||
                          "No email";

                        const jobTitle =
                          application.job?.title ||
                          "Job";

                        return (
                          <div
                            key={application._id}
                            className="
                              bg-zinc-900
                              border
                              border-zinc-800
                              hover:border-zinc-700
                              rounded-xl
                              p-5
                              transition
                            "
                          >

                            {/* =================================================
                                Candidate
                            ================================================= */}
                            <div className="flex items-start gap-3">

                              <div
                                className="
                                  w-10
                                  h-10
                                  rounded-lg
                                  bg-cyan-500/10
                                  flex
                                  items-center
                                  justify-center
                                  shrink-0
                                "
                              >
                                <FaUser className="text-cyan-400" />
                              </div>

                              <div className="min-w-0">

                                <h3 className="font-semibold truncate">
                                  {candidateName}
                                </h3>

                                <p className="text-xs text-zinc-500 mt-1 truncate">
                                  {jobTitle}
                                </p>

                              </div>

                            </div>

                            {/* =================================================
                                Email
                            ================================================= */}
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                mt-4
                                text-xs
                                text-zinc-500
                              "
                            >
                              <FaEnvelope />

                              <span className="truncate">
                                {candidateEmail}
                              </span>
                            </div>

                            {/* =================================================
                                ATS Score
                            ================================================= */}
                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                mt-5
                                pt-4
                                border-t
                                border-zinc-800
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-zinc-500
                                "
                              >
                                <FaChartLine />
                                ATS Score
                              </div>

                              <span className="font-bold text-cyan-400">
                                {application.matchScore || 0}%
                              </span>

                            </div>

                            {/* =================================================
                                Update Status
                            ================================================= */}
                            <div className="mt-4">

                              <label className="block text-xs text-zinc-500 mb-2">
                                Application Status
                              </label>

                              <select
                                value={
                                  application.status ||
                                  "Applied"
                                }
                                disabled={
                                  updatingId ===
                                  application._id
                                }
                                onChange={(event) =>
                                  handleStatusChange(
                                    application._id,
                                    event.target.value
                                  )
                                }
                                className="
                                  w-full
                                  bg-zinc-800
                                  border
                                  border-zinc-700
                                  text-white
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-sm
                                  outline-none
                                  focus:border-cyan-500
                                  disabled:opacity-50
                                  disabled:cursor-not-allowed
                                "
                              >
                                {statuses.map(
                                  (statusOption) => (
                                    <option
                                      key={
                                        statusOption
                                      }
                                      value={
                                        statusOption
                                      }
                                    >
                                      {statusOption}
                                    </option>
                                  )
                                )}
                              </select>

                              {updatingId ===
                                application._id && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                                  <FaSyncAlt className="animate-spin" />
                                  Updating status...
                                </div>
                              )}

                            </div>

                            {/* =================================================
                                View Application
                            ================================================= */}
                            <Link
                              to={`/recruiter/applications/${application._id}`}
                              className="
                                mt-4
                                w-full
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                bg-zinc-800
                                hover:bg-zinc-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                transition
                              "
                            >
                              <FaEye />
                              View Application
                            </Link>

                          </div>
                        );
                      }
                    )
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default ApplicationPipeline;
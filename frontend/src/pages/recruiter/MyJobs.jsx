import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getMyJobs,
  deleteJob,
} from "../../services/jobService";

import api from "../../services/api";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  // =====================================================
  // Fetch Jobs + Real Application Counts
  // =====================================================
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getMyJobs();

      const jobsData = response.data || [];

      // Get applications for every job
      const jobsWithApplicants = await Promise.all(
        jobsData.map(async (job) => {
          try {
            const applicationResponse = await api.get(
              `/applications/job/${job._id}`
            );

            const applications =
              applicationResponse.data?.data || [];

            return {
              ...job,
              applicantsCount: applications.length,
            };
          } catch (error) {
            console.error(
              `Failed to load applications for job ${job._id}`,
              error
            );

            return {
              ...job,
              applicantsCount: 0,
            };
          }
        })
      );

      setJobs(jobsWithApplicants);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Delete Job
  // =====================================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await deleteJob(id);

      toast.success("Job deleted successfully.");

      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  // =====================================================
  // Loading
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-zinc-400">
            Loading your jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              My Jobs
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage all your posted jobs.
            </p>
          </div>

          <Link
            to="/recruiter/post-job"
            className="
              bg-cyan-500
              hover:bg-cyan-600
              px-5
              py-3
              rounded-lg
              font-semibold
              transition
              text-center
            "
          >
            + Post Job
          </Link>

        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

            <h2 className="text-xl font-semibold">
              No jobs posted yet.
            </h2>

            <p className="text-zinc-500 mt-2">
              Create your first job posting to start
              receiving applications.
            </p>

            <Link
              to="/recruiter/post-job"
              className="
                inline-block
                mt-6
                bg-cyan-500
                hover:bg-cyan-600
                px-5
                py-3
                rounded-lg
                font-semibold
              "
            >
              + Post Your First Job
            </Link>

          </div>
        ) : (

          <div className="space-y-5">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-2xl
                  p-6
                  hover:border-zinc-700
                  transition
                "
              >

                <div className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                ">

                  {/* Job Information */}
                  <div className="flex-1">

                    <h2 className="text-2xl font-semibold">
                      {job.title}
                    </h2>

                    <p className="text-zinc-400 mt-1">
                      {job.company}
                    </p>

                    <p className="text-zinc-500 mt-1">
                      {job.location}
                    </p>

                    <div className="flex items-center gap-4 mt-3">

                      {/* REAL APPLICATION COUNT */}
                      <p>
                        Applicants:

                        <span className="
                          text-cyan-400
                          ml-2
                          font-semibold
                        ">
                          {job.applicantsCount || 0}
                        </span>
                      </p>

                      {/* Job Status */}
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          ${
                            job.status === "Open"
                              ? "bg-green-500/20 text-green-400"
                              : job.status === "Closed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-zinc-700 text-zinc-300"
                          }
                        `}
                      >
                        {job.status}
                      </span>

                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">

                    {/* View Job */}
                    <Link
                      to={`/recruiter/jobs/${job._id}`}
                      title="View Job"
                      className="
                        bg-blue-500
                        hover:bg-blue-600
                        p-3
                        rounded-lg
                        transition
                      "
                    >
                      <FaEye />
                    </Link>

                    {/* Applicants */}
                    <Link
                      to={`/recruiter/jobs/${job._id}/applicants`}
                      title="View Applicants"
                      className="
                        bg-cyan-500
                        hover:bg-cyan-600
                        p-3
                        rounded-lg
                        transition
                      "
                    >
                      <FaUsers />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/recruiter/jobs/edit/${job._id}`}
                      title="Edit Job"
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        p-3
                        rounded-lg
                        transition
                      "
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDelete(job._id)
                      }
                      title="Delete Job"
                      className="
                        bg-red-500
                        hover:bg-red-600
                        p-3
                        rounded-lg
                        transition
                      "
                    >
                      <FaTrash />
                    </button>

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

export default MyJobs;
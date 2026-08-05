import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getMyJobs,
  deleteJob,
} from "../../services/jobService";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getMyJobs();

      setJobs(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      toast.success("Job deleted successfully");

      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center text-white text-2xl">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

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
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            + Post Job
          </Link>

        </div>

        {jobs.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl py-16 text-center">

            <h2 className="text-2xl font-semibold">
              No Jobs Posted Yet
            </h2>

            <p className="text-zinc-500 mt-3">
              Start by posting your first job.
            </p>

            <Link
              to="/recruiter/post-job"
              className="inline-block mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
            >
              Post Your First Job
            </Link>

          </div>
        ) : (
          <div className="space-y-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex justify-between items-center hover:border-cyan-500 transition"
              >

                <div>

                  <h2 className="text-2xl font-semibold">
                    {job.title}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    {job.company}
                  </p>

                  <p className="text-zinc-500">
                    {job.location}
                  </p>

                  <p className="mt-2">
                    Applicants :
                    <span className="text-cyan-400 ml-2">
                      {job.applicants?.length || 0}
                    </span>
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                      job.status === "Open"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>

                <div className="flex gap-3">

                  {/* View Job */}
                  <Link
                    to={`/recruiter/jobs/${job._id}`}
                    className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition"
                    title="View Job"
                  >
                    <FaEye />
                  </Link>

                  {/* Edit Job */}
                  <Link
                    to={`/recruiter/jobs/edit/${job._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-lg transition"
                    title="Edit Job"
                  >
                    <FaEdit />
                  </Link>

                  {/* Delete Job */}
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-lg transition"
                    title="Delete Job"
                  >
                    <FaTrash />
                  </button>

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
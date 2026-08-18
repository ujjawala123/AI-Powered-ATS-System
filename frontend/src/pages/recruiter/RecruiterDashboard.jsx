import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { getRecruiterDashboard } from "../../services/applicationService";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applications: 0,
    interviews: 0,
    hired: 0,
  });

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // Fetch Dashboard Data
  // =====================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getRecruiterDashboard();

      console.log(
        "Recruiter Dashboard Data:",
        response
      );

      setStats(
        response.stats || {
          jobsPosted: 0,
          applications: 0,
          interviews: 0,
          hired: 0,
        }
      );

      setJobs(response.jobs || []);
    } catch (error) {
      console.error(
        "Recruiter dashboard error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load recruiter dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Statistics Cards
  // =====================================================

  const statCards = [
    {
      title: "Jobs Posted",
      value: stats.jobsPosted,
      icon: <FaBriefcase />,
    },
    {
      title: "Applications",
      value: stats.applications,
      icon: <FaUsers />,
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: <FaUserCheck />,
    },
    {
      title: "Hired",
      value: stats.hired,
      icon: <FaCheckCircle />,
    },
  ];

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-zinc-400">
            Loading recruiter dashboard...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // Dashboard
  // =====================================================

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* =================================================
            Header
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              Recruiter Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage your job postings and applicants.
            </p>

          </div>

          <div className="flex gap-4">

            <Link
              to="/recruiter/post-job"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold transition"
            >
              <FaPlus />
              Post New Job
            </Link>

            <Link
              to="/recruiter/jobs"
              className="flex items-center justify-center px-5 py-3 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold transition"
            >
              My Jobs
            </Link>

          </div>

        </div>

        {/* =================================================
            Error
        ================================================= */}

        {error && (
          <div className="mt-8 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-5 py-4">
            {error}
          </div>
        )}

        {/* =================================================
            Statistics
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {statCards.map((item) => (

            <div
              key={item.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500 transition"
            >

              <div className="text-3xl text-cyan-400">
                {item.icon}
              </div>

              <p className="text-zinc-400 mt-5">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

          ))}

        </div>

        {/* =================================================
            Recent Jobs
        ================================================= */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl mt-12 p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Recent Job Posts
            </h2>

            <Link
              to="/recruiter/jobs"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
            >
              View All
            </Link>

          </div>

          {/* =================================================
              No Jobs
          ================================================= */}

          {jobs.length === 0 ? (

            <div className="text-center py-12">

              <FaBriefcase className="text-5xl text-zinc-700 mx-auto mb-4" />

              <h3 className="text-xl font-semibold">
                No jobs posted yet
              </h3>

              <p className="text-zinc-500 mt-2">
                Create your first job posting.
              </p>

              <Link
                to="/recruiter/post-job"
                className="inline-flex items-center gap-2 mt-6 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold transition"
              >
                <FaPlus />
                Post New Job
              </Link>

            </div>

          ) : (

            /* =================================================
               Jobs Table
            ================================================= */

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b border-zinc-700 text-zinc-400">

                  <tr>

                    <th className="text-left py-3">
                      Job Title
                    </th>

                    <th className="text-left">
                      Applicants
                    </th>

                    <th className="text-left">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {jobs.map((job) => (

                    <tr
                      key={job._id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                    >

                      {/* Job */}

                      <td className="py-4">

                        <div>

                          <p className="font-semibold">
                            {job.title}
                          </p>

                          <p className="text-sm text-zinc-500 mt-1">

                            {job.company}

                            {job.location
                              ? ` • ${job.location}`
                              : ""}

                          </p>

                        </div>

                      </td>

                      {/* Applicants */}

                      <td>
                        {job.applicants}
                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            job.status === "Open"
                              ? "bg-green-500/20 text-green-400"
                              : job.status === "Closed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {job.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default RecruiterDashboard;
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBookmark,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";

import { getMyApplications } from "../../services/applicationService";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // Get Logged-in Applicant Applications
  // =====================================================
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyApplications();

        if (response.success) {
          setApplications(response.data || []);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error(
          "Failed to load applications:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load applications."
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // =====================================================
  // Calculate Dashboard Statistics
  // =====================================================

  const appliedJobs = applications.length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const averageATS =
    applications.length > 0
      ? Math.round(
          applications.reduce(
            (total, application) =>
              total +
              Number(application.matchScore || 0),
            0
          ) / applications.length
        )
      : 0;

  // Saved Jobs feature is not implemented yet
  const savedJobs = 0;

  const stats = [
    {
      title: "Applied Jobs",
      value: appliedJobs,
      icon: <FaBriefcase />,
    },
    {
      title: "Saved Jobs",
      value: savedJobs,
      icon: <FaBookmark />,
    },
    {
      title: "Average ATS",
      value: `${averageATS}%`,
      icon: <FaChartLine />,
    },
    {
      title: "Interviews",
      value: interviews,
      icon: <FaUserCheck />,
    },
  ];

  // =====================================================
  // Loading State
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-400 text-xl font-semibold">
            Loading dashboard...
          </p>

          <p className="text-zinc-500 mt-2">
            Fetching your applications
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      <div className="max-w-7xl mx-auto p-8">

        {/* =====================================================
            Header
        ===================================================== */}

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-400 mt-2">
          Here's an overview of your job search.
        </p>

        {/* =====================================================
            Error Message
        ===================================================== */}

        {error && (
          <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
            {error}
          </div>
        )}

        {/* =====================================================
            Stats
        ===================================================== */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-cyan-500 transition"
            >

              <div className="text-cyan-400 text-3xl">
                {item.icon}
              </div>

              <h2 className="mt-5 text-zinc-400">
                {item.title}
              </h2>

              <p className="text-3xl font-bold mt-2">
                {item.value}
              </p>

            </div>
          ))}

        </div>

        {/* =====================================================
            Recent Applications
        ===================================================== */}

        <div className="bg-zinc-900 rounded-2xl mt-12 p-6 border border-zinc-800">

          <h2 className="text-2xl font-bold mb-6">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <div className="py-10 text-center">

              <FaBriefcase className="text-zinc-700 text-5xl mx-auto mb-4" />

              <p className="text-zinc-400">
                You haven't applied to any jobs yet.
              </p>

              <p className="text-zinc-600 text-sm mt-2">
                Your applications will appear here.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="text-zinc-400 border-b border-zinc-700">

                  <tr>

                    <th className="text-left py-3">
                      Company
                    </th>

                    <th className="text-left py-3">
                      Role
                    </th>

                    <th className="text-left py-3">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {applications.map((application) => (

                    <tr
                      key={application._id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                    >

                      <td className="py-4">
                        {application.job?.company ||
                          "N/A"}
                      </td>

                      <td>
                        {application.job?.title ||
                          "N/A"}
                      </td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            application.status ===
                            "Interview"
                              ? "bg-green-500/20 text-green-400"
                              : application.status ===
                                "Rejected"
                              ? "bg-red-500/20 text-red-400"
                              : application.status ===
                                "Offered"
                              ? "bg-purple-500/20 text-purple-400"
                              : application.status ===
                                "Shortlisted"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-cyan-500/20 text-cyan-400"
                          }`}
                        >
                          {application.status}
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

export default Dashboard;
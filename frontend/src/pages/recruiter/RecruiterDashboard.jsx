import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Jobs Posted",
    value: 12,
    icon: <FaBriefcase />,
  },
  {
    title: "Applications",
    value: 156,
    icon: <FaUsers />,
  },
  {
    title: "Interviews",
    value: 24,
    icon: <FaUserCheck />,
  },
  {
    title: "Hired",
    value: 6,
    icon: <FaCheckCircle />,
  },
];

const jobs = [
  {
    title: "Frontend Developer",
    applicants: 42,
    status: "Open",
  },
  {
    title: "Backend Developer",
    applicants: 31,
    status: "Open",
  },
  {
    title: "UI/UX Designer",
    applicants: 18,
    status: "Closed",
  },
];

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}

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

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {stats.map((item) => (
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

        {/* Recent Jobs */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl mt-12 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Job Posts
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-zinc-700 text-zinc-400">

                <tr>
                  <th className="text-left py-3">Job Title</th>
                  <th className="text-left">Applicants</th>
                  <th className="text-left">Status</th>
                </tr>

              </thead>

              <tbody>

                {jobs.map((job) => (
                  <tr
                    key={job.title}
                    className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                  >
                    <td className="py-4">
                      {job.title}
                    </td>

                    <td>
                      {job.applicants}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          job.status === "Open"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
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

        </div>

      </div>

    </div>
  );
};

export default RecruiterDashboard;
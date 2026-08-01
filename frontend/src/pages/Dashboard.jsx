import {
  FaBriefcase,
  FaBookmark,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";

const stats = [
  {
    title: "Applied Jobs",
    value: 12,
    icon: <FaBriefcase />,
  },
  {
    title: "Saved Jobs",
    value: 8,
    icon: <FaBookmark />,
  },
  {
    title: "Average ATS",
    value: "82%",
    icon: <FaChartLine />,
  },
  {
    title: "Interviews",
    value: 3,
    icon: <FaUserCheck />,
  },
];

const applications = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    status: "Applied",
  },
  {
    company: "Amazon",
    role: "Backend Developer",
    status: "Rejected",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-400 mt-2">
          Here's an overview of your job search.
        </p>

        {/* Stats */}
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

        {/* Recent Applications */}
        <div className="bg-zinc-900 rounded-2xl mt-12 p-6 border border-zinc-800">

          <h2 className="text-2xl font-bold mb-6">
            Recent Applications
          </h2>

          <table className="w-full">

            <thead className="text-zinc-400 border-b border-zinc-700">
              <tr>
                <th className="text-left py-3">Company</th>
                <th className="text-left py-3">Role</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((app) => (
                <tr
                  key={app.company}
                  className="border-b border-zinc-800"
                >
                  <td className="py-4">{app.company}</td>
                  <td>{app.role}</td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
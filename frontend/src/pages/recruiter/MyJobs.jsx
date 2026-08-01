import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Pune",
    applicants: 15,
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Mumbai",
    applicants: 8,
    status: "Open",
  },
];

const MyJobs = () => {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              My Jobs
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage all posted jobs.
            </p>
          </div>

          <Link
            to="/recruiter/post-job"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg"
          >
            + Post Job
          </Link>

        </div>

        <div className="space-y-6">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="bg-zinc-900 rounded-xl p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-semibold">
                  {job.title}
                </h2>

                <p className="text-zinc-400">
                  {job.location}
                </p>

                <p className="mt-2">
                  Applicants :
                  <span className="text-cyan-400 ml-2">
                    {job.applicants}
                  </span>
                </p>

              </div>

              <div className="flex gap-4">

                <button className="bg-blue-500 p-3 rounded-lg">
                  <FaEye />
                </button>

                <button className="bg-yellow-500 p-3 rounded-lg">
                  <FaEdit />
                </button>

                <button className="bg-red-500 p-3 rounded-lg">
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default MyJobs;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobById } from "../../services/jobService";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);
      setJob(response.data);
    } catch (error) {
      toast.error("Unable to load job.");
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8 border border-zinc-800">

        <div className="flex justify-between items-start">

          <div>
            <h1 className="text-4xl font-bold">{job.title}</h1>

            <p className="text-zinc-400 mt-2">
              {job.company} • {job.location}
            </p>

            <p className="text-zinc-500 mt-2">
              {job.employmentType}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full ${
              job.status === "Open"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {job.status}
          </span>

        </div>

        <div className="mt-10 space-y-8">

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Description
            </h2>

            <p className="text-zinc-300 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Experience
            </h2>

            <p>{job.experience}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Salary
            </h2>

            <p>{job.salary}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {job.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Requirements
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              {job.requirements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Benefits
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              {job.benefits?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>

        <Link
          to="/recruiter/jobs"
          className="inline-block mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
        >
          ← Back to My Jobs
        </Link>

      </div>
    </div>
  );
};

export default ViewJob;
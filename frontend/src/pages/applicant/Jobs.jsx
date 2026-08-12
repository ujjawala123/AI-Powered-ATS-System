import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getAllJobs } from "../../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getAllJobs();

      setJobs(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Find Your Next Job
          </h1>

          <p className="text-zinc-400 mt-2">
            Explore open positions and find the right opportunity
            for your career.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-400">
              Loading available jobs...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <FaBriefcase className="text-4xl text-zinc-600 mx-auto mb-4" />

            <h2 className="text-xl font-semibold">
              No jobs available
            </h2>

            <p className="text-zinc-500 mt-2">
              There are currently no open positions.
            </p>
          </div>
        )}

        {/* Jobs */}
        {!loading && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition"
              >

                {/* Job Title */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {job.title}
                    </h2>

                    <p className="text-cyan-400 mt-1">
                      {job.company}
                    </p>
                  </div>

                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                    {job.status}
                  </span>
                </div>

                {/* Job Info */}
                <div className="space-y-3 mt-6 text-sm text-zinc-400">

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-zinc-500" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-zinc-500" />
                    <span>{job.employmentType}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBriefcase className="text-zinc-500" />
                    <span>{job.experience}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-zinc-500" />
                    <span>
                      {job.salary || "Not Disclosed"}
                    </span>
                  </div>

                </div>

                {/* Description */}
                <p className="text-zinc-500 text-sm mt-6 line-clamp-3">
                  {job.description}
                </p>

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">

                    {job.skills.slice(0, 5).map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      )
                    )}

                    {job.skills.length > 5 && (
                      <span className="text-xs text-zinc-500 px-2 py-1">
                        +{job.skills.length - 5} more
                      </span>
                    )}

                  </div>
                )}

                {/* View Job */}
                <Link
                  to={`/applicant/jobs/${job._id}`}
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-3 rounded-lg font-semibold transition"
                >
                  View Job
                  <FaArrowRight />
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;
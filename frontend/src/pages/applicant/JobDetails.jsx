import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getJobById } from "../../services/jobService";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);

      const response = await getJobById(id);

      setJob(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load job details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    navigate(`/applicant/jobs/${id}/apply`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <p className="text-zinc-400">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold">
            Job Not Found
          </h1>

          <p className="text-zinc-400 mt-3">
            This job may have been removed or is no longer available.
          </p>

          <Link
            to="/applicant/jobs"
            className="inline-flex items-center gap-2 mt-6 bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-3 rounded-lg font-semibold"
          >
            <FaArrowLeft />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to="/applicant/jobs"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <FaArrowLeft />
          Back to Jobs
        </Link>

        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div>
              <span className="inline-block bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm mb-4">
                {job.status}
              </span>

              <h1 className="text-4xl font-bold">
                {job.title}
              </h1>

              <p className="text-xl text-cyan-400 mt-2">
                {job.company}
              </p>
            </div>

            <button
              onClick={handleApply}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-7 py-3 rounded-lg font-semibold"
            >
              Apply Now
            </button>

          </div>

          {/* Job Information */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            <div className="bg-zinc-800/60 rounded-xl p-4">
              <FaMapMarkerAlt className="text-cyan-400 mb-2" />

              <p className="text-sm text-zinc-500">
                Location
              </p>

              <p className="mt-1">
                {job.location}
              </p>
            </div>

            <div className="bg-zinc-800/60 rounded-xl p-4">
              <FaBriefcase className="text-cyan-400 mb-2" />

              <p className="text-sm text-zinc-500">
                Employment Type
              </p>

              <p className="mt-1">
                {job.employmentType}
              </p>
            </div>

            <div className="bg-zinc-800/60 rounded-xl p-4">
              <FaClock className="text-cyan-400 mb-2" />

              <p className="text-sm text-zinc-500">
                Experience
              </p>

              <p className="mt-1">
                {job.experience}
              </p>
            </div>

            <div className="bg-zinc-800/60 rounded-xl p-4">
              <FaMoneyBillWave className="text-cyan-400 mb-2" />

              <p className="text-sm text-zinc-500">
                Salary
              </p>

              <p className="mt-1">
                {job.salary || "Not Disclosed"}
              </p>
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Job Description
          </h2>

          <p className="text-zinc-400 leading-7 whitespace-pre-line">
            {job.description}
          </p>

        </div>

        {/* Skills */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {job.skills?.length > 0 ? (
              job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-zinc-500">
                No specific skills listed.
              </p>
            )}

          </div>

        </div>

        {/* Requirements */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            Requirements
          </h2>

          {job.requirements?.length > 0 ? (
            <div className="space-y-3">

              {job.requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-zinc-400"
                >
                  <FaCheckCircle className="text-cyan-400 mt-1 shrink-0" />

                  <span>{requirement}</span>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-zinc-500">
              No specific requirements listed.
            </p>
          )}

        </div>

        {/* Benefits */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            Benefits
          </h2>

          {job.benefits?.length > 0 ? (
            <div className="space-y-3">

              {job.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-zinc-400"
                >
                  <FaCheckCircle className="text-green-400 mt-1 shrink-0" />

                  <span>{benefit}</span>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-zinc-500">
              No benefits listed.
            </p>
          )}

        </div>

        {/* Bottom Apply */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-6 text-center">

          <h2 className="text-2xl font-bold">
            Interested in this position?
          </h2>

          <p className="text-zinc-400 mt-2">
            Submit your application and let our ATS evaluate your resume.
          </p>

          <button
            onClick={handleApply}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-3 rounded-lg font-semibold"
          >
            Apply for this Job
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCloudUploadAlt,
  FaFileAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getJobById } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ================================
  // Get Job Details
  // ================================
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

  // ================================
  // Resume Selection
  // ================================
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setResume(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      e.target.value = "";
      setResume(null);
      return;
    }

    // 5 MB limit - same as backend Multer configuration
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume size must be less than 5 MB.");
      e.target.value = "";
      setResume(null);
      return;
    }

    setResume(file);
  };

  // ================================
  // Submit Application
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      await applyForJob(id, formData);

      toast.success("Application submitted successfully!");

      setTimeout(() => {
        navigate("/applicant/applications");
      }, 800);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================================
  // Loading
  // ================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <p className="text-zinc-400">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // ================================
  // Job Not Found
  // ================================
  if (!job) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white p-8">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl font-bold">
            Job Not Found
          </h1>

          <p className="text-zinc-400 mt-3">
            The job you're trying to apply for does not exist.
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

      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to={`/applicant/jobs/${id}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <FaArrowLeft />
          Back to Job
        </Link>

        {/* Job Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 mb-6">

          <div className="flex items-start gap-4">

            <div className="bg-cyan-500/10 text-cyan-400 p-4 rounded-xl">
              <FaBriefcase className="text-2xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {job.title}
              </h1>

              <p className="text-cyan-400 mt-1">
                {job.company}
              </p>

              <p className="text-zinc-500 mt-2">
                {job.location} • {job.employmentType}
              </p>
            </div>

          </div>

        </div>

        {/* Application Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <div className="mb-8">

            <h2 className="text-2xl font-bold">
              Submit Your Application
            </h2>

            <p className="text-zinc-400 mt-2">
              Upload your resume and add a cover letter to apply
              for this position.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* Resume */}
            <div>

              <label className="block text-sm font-medium mb-3">
                Resume <span className="text-red-400">*</span>
              </label>

              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-cyan-500 rounded-xl p-8 cursor-pointer transition"
              >

                <FaCloudUploadAlt className="text-4xl text-cyan-400 mb-4" />

                <p className="font-semibold">
                  {resume
                    ? resume.name
                    : "Click to upload your resume"}
                </p>

                <p className="text-zinc-500 text-sm mt-2">
                  PDF, DOC or DOCX • Maximum 5 MB
                </p>

                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />

              </label>

              {resume && (
                <div className="flex items-center gap-3 mt-3 bg-zinc-800 rounded-lg p-3">

                  <FaFileAlt className="text-cyan-400" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">
                      {resume.name}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Cover Letter */}
            <div>

              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium mb-3"
              >
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                value={coverLetter}
                onChange={(e) =>
                  setCoverLetter(e.target.value)
                }
                rows="8"
                placeholder="Tell the recruiter why you are a good fit for this position..."
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-cyan-500 focus:outline-none rounded-xl p-4 text-white placeholder-zinc-600 resize-none"
              />

              <p className="text-xs text-zinc-600 mt-2">
                {coverLetter.length} characters
              </p>

            </div>

            {/* ATS Information */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5">

              <h3 className="font-semibold text-cyan-400">
                AI-Powered Resume Analysis
              </h3>

              <p className="text-sm text-zinc-400 mt-2 leading-6">
                After submitting your application, your resume
                will be analyzed against the job requirements.
                Your ATS score, matched skills, and missing
                skills will be generated automatically.
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <Link
                to={`/applicant/jobs/${id}`}
                className="flex-1 text-center bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-semibold"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:text-zinc-500 text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                {submitting
                  ? "Submitting Application..."
                  : "Submit Application"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ApplyJob;
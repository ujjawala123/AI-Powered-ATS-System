import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getJobById,
  updateJob,
} from "../../services/jobService";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "Full Time",
    experience: "",
    salary: "",
    description: "",
    skills: "",
    requirements: "",
    benefits: "",
    status: "Open",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);

      const data = response.data;

      setJob({
        ...data,
        skills: data.skills?.join(", ") || "",
        requirements: data.requirements?.join("\n") || "",
        benefits: data.benefits?.join("\n") || "",
      });
    } catch (error) {
      toast.error("Unable to load job.");
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...job,
        skills: job.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        requirements: job.requirements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        benefits: job.benefits
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await updateJob(id, payload);

      toast.success("Job updated successfully!");

      navigate("/recruiter/jobs");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update job."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Edit Job
        </h1>

        <p className="text-zinc-400 mb-8">
          Update your job details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label>Job Title</label>

              <input
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            <div>
              <label>Company</label>

              <input
                type="text"
                name="company"
                value={job.company}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            <div>
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            <div>
              <label>Employment Type</label>

              <select
                name="employmentType"
                value={job.employmentType}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                value={job.experience}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            <div>
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />
            </div>

          </div>

          <div>
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={job.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              required
            />
          </div>

          <div>
            <label>Skills (comma separated)</label>

            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label>Requirements (one per line)</label>

            <textarea
              rows="4"
              name="requirements"
              value={job.requirements}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label>Benefits (one per line)</label>

            <textarea
              rows="4"
              name="benefits"
              value={job.benefits}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label>Status</label>

            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditJob;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
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
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(job);

    // Backend API will be connected next

    navigate("/recruiter/jobs");
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Post New Job
        </h1>

        <p className="text-zinc-400 mb-8">
          Fill in the job details below.
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
            />
          </div>

          <div>
            <label>Required Skills (comma separated)</label>

            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label>Requirements</label>

            <textarea
              rows="3"
              name="requirements"
              value={job.requirements}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label>Benefits</label>

            <textarea
              rows="3"
              name="benefits"
              value={job.benefits}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />
          </div>

          <button
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold"
          >
            Publish Job
          </button>

        </form>

      </div>
    </div>
  );
};

export default PostJob;
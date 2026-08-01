import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Join AI ATS and land your dream job faster.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-zinc-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-zinc-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-zinc-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-zinc-300">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="applicant">
                Applicant
              </option>

              <option value="recruiter">
                Recruiter
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600 transition"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
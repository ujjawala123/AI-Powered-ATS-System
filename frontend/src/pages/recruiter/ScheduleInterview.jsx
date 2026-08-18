import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaStickyNote,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";

const ScheduleInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewTime: "",
    interviewLink: "",
    interviewNotes: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // Handle Input Change
  // =====================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // Submit Interview
  // =====================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.interviewDate) {
      toast.error("Please select an interview date.");
      return;
    }

    if (!formData.interviewTime) {
      toast.error("Please select an interview time.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/applications/${id}/schedule-interview`,
        formData
      );

      toast.success(
        response.data.message ||
          "Interview scheduled successfully."
      );

      navigate(`/recruiter/applications/${id}`);
    } catch (error) {
      console.error(
        "Schedule interview error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to schedule interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-6 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* =================================================
            Back Button
        ================================================= */}
        <button
          type="button"
          onClick={() =>
            navigate(
              `/recruiter/applications/${id}`
            )
          }
          className="
            flex
            items-center
            gap-2
            text-zinc-400
            hover:text-white
            transition
            mb-6
          "
        >
          <FaArrowLeft />
          Back to Application
        </button>

        {/* =================================================
            Header
        ================================================= */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-cyan-500/10
                border
                border-cyan-500/20
                flex
                items-center
                justify-center
              "
            >
              <FaCalendarAlt className="text-cyan-400 text-xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Schedule Interview
              </h1>

              <p className="text-zinc-400 mt-1">
                Schedule an interview with this candidate.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            Form Card
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-6
            md:p-8
            shadow-xl
          "
        >

          {/* =================================================
              Date
          ================================================= */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Interview Date
            </label>

            <div className="relative">
              <FaCalendarAlt
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-cyan-500
                  transition
                "
              />
            </div>
          </div>

          {/* =================================================
              Time
          ================================================= */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Interview Time
            </label>

            <div className="relative">
              <FaClock
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-cyan-500
                  transition
                "
              />
            </div>
          </div>

          {/* =================================================
              Meeting Link
          ================================================= */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Interview / Meeting Link
            </label>

            <div className="relative">
              <FaVideo
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <input
                type="url"
                name="interviewLink"
                value={formData.interviewLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-cyan-500
                  transition
                "
              />
            </div>

            <p className="text-xs text-zinc-600 mt-2">
              Example: Google Meet, Zoom, or Microsoft Teams link.
            </p>
          </div>

          {/* =================================================
              Notes
          ================================================= */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Interview Notes
            </label>

            <div className="relative">
              <FaStickyNote
                className="
                  absolute
                  left-4
                  top-4
                  text-zinc-500
                "
              />

              <textarea
                name="interviewNotes"
                value={formData.interviewNotes}
                onChange={handleChange}
                rows="5"
                placeholder="Add interview instructions or notes..."
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  outline-none
                  focus:border-cyan-500
                  transition
                  resize-none
                "
              />
            </div>
          </div>

          {/* =================================================
              Actions
          ================================================= */}
          <div className="flex flex-col sm:flex-row gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/recruiter/applications/${id}`
                )
              }
              className="
                flex-1
                px-5
                py-3
                rounded-xl
                bg-zinc-800
                hover:bg-zinc-700
                border
                border-zinc-700
                text-zinc-300
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                disabled:bg-zinc-700
                disabled:text-zinc-500
                text-black
                font-semibold
                transition
              "
            >
              <FaCheckCircle />

              {loading
                ? "Scheduling..."
                : "Schedule Interview"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ScheduleInterview;
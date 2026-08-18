import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaFilter,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaEye,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";

const CandidateRanking = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // Filters
  // =====================================================
  const [minScore, setMinScore] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [skills, setSkills] = useState("");

  // =====================================================
  // Fetch Candidates
  // =====================================================
  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (minScore !== "") {
        params.append("minScore", minScore);
      }

      if (minExperience !== "") {
        params.append(
          "minExperience",
          minExperience
        );
      }

      if (skills.trim() !== "") {
        params.append(
          "skills",
          skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
            .join(",")
        );
      }

      const queryString = params.toString();

      const response = await api.get(
        `/applications/ranking${
          queryString ? `?${queryString}` : ""
        }`
      );

      setCandidates(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to load candidate ranking:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load candidate ranking."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Initial Load
  // =====================================================
  useEffect(() => {
    fetchCandidates();
  }, []);

  // =====================================================
  // Apply Filters
  // =====================================================
  const handleApplyFilters = () => {
    fetchCandidates();
  };

  // =====================================================
  // Clear Filters
  // =====================================================
  const handleClearFilters = () => {
    setMinScore("");
    setMinExperience("");
    setSkills("");

    setTimeout(() => {
      fetchCandidates();
    }, 0);
  };

  // =====================================================
  // Score Style
  // =====================================================
  const getScoreStyle = (score) => {
    if (score >= 80) {
      return "text-green-400";
    }

    if (score >= 60) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  // =====================================================
  // Loading State
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <div className="text-center">
          <FaSyncAlt className="text-cyan-400 text-3xl animate-spin mx-auto mb-4" />

          <p className="text-zinc-400">
            Loading candidate ranking...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            Header
        ================================================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Candidate Ranking
            </h1>

            <p className="text-zinc-400 mt-2">
              Find and rank the best candidates using
              ATS score, skills, and experience.
            </p>
          </div>

          <button
            onClick={fetchCandidates}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-zinc-800
              hover:bg-zinc-700
              border
              border-zinc-700
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            <FaSyncAlt />
            Refresh
          </button>

        </div>

        {/* =================================================
            Filters
        ================================================= */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">

          <div className="flex items-center gap-2 mb-6">
            <FaFilter className="text-cyan-400" />

            <h2 className="text-lg font-semibold">
              Advanced Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Minimum ATS Score */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Minimum ATS Score
              </label>

              <div className="relative">
                <FaChartLine
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(event) =>
                    setMinScore(event.target.value)
                  }
                  placeholder="Example: 70"
                  className="
                    w-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-white
                    pl-10
                    pr-4
                    py-3
                    rounded-lg
                    outline-none
                    focus:border-cyan-500
                  "
                />
              </div>
            </div>

            {/* Minimum Experience */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Minimum Experience
              </label>

              <div className="relative">
                <FaBriefcase
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  type="number"
                  min="0"
                  value={minExperience}
                  onChange={(event) =>
                    setMinExperience(
                      event.target.value
                    )
                  }
                  placeholder="Example: 2"
                  className="
                    w-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-white
                    pl-10
                    pr-4
                    py-3
                    rounded-lg
                    outline-none
                    focus:border-cyan-500
                  "
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Skills
              </label>

              <div className="relative">
                <FaSearch
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                  "
                />

                <input
                  type="text"
                  value={skills}
                  onChange={(event) =>
                    setSkills(event.target.value)
                  }
                  placeholder="React, Node.js, MongoDB"
                  className="
                    w-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-white
                    pl-10
                    pr-4
                    py-3
                    rounded-lg
                    outline-none
                    focus:border-cyan-500
                  "
                />
              </div>

              <p className="text-xs text-zinc-600 mt-2">
                Separate multiple skills with commas.
              </p>
            </div>

          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">

            <button
              onClick={handleApplyFilters}
              className="
                inline-flex
                items-center
                gap-2
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-5
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              <FaFilter />
              Apply Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="
                inline-flex
                items-center
                gap-2
                bg-zinc-800
                hover:bg-zinc-700
                border
                border-zinc-700
                px-5
                py-3
                rounded-lg
                transition
              "
            >
              <FaTimes />
              Clear Filters
            </button>

          </div>

        </div>

        {/* =================================================
            Results Summary
        ================================================= */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-semibold">
              Ranked Candidates
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              {candidates.length} candidate
              {candidates.length !== 1 ? "s" : ""} found
            </p>
          </div>

        </div>

        {/* =================================================
            Empty State
        ================================================= */}
        {candidates.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

            <FaUser className="text-4xl text-zinc-700 mx-auto mb-4" />

            <h2 className="text-xl font-semibold">
              No Candidates Found
            </h2>

            <p className="text-zinc-500 mt-2">
              Try changing your score, skill, or
              experience filters.
            </p>

          </div>
        ) : (

          /* =================================================
             Candidate List
          ================================================= */
          <div className="space-y-4">

            {candidates.map(
              (application, index) => {

                const candidateName =
                   application.candidate?.name ||
                   application.candidateName ||
                   "Unknown Candidate";

                const candidateEmail =
                  application.candidateEmail ||
                  application.candidate?.email ||
                  "No email available";

                const jobTitle =
                  application.job?.title ||
                  "Job";

                const score =
                  application.matchScore || 0;

                return (
                  <div
                    key={application._id}
                    className="
                      bg-zinc-900
                      border
                      border-zinc-800
                      hover:border-zinc-700
                      rounded-2xl
                      p-6
                      transition
                    "
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                      {/* Ranking */}
                      <div
                        className="
                          w-12
                          h-12
                          rounded-xl
                          bg-cyan-500/10
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <span className="text-cyan-400 font-bold text-lg">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Candidate Information */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-center gap-3">

                          <div>
                            <h3 className="text-xl font-semibold">
                              {candidateName}
                            </h3>

                            <p className="text-sm text-zinc-500 mt-1">
                              {jobTitle}
                            </p>
                          </div>

                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-500">

                          <span className="flex items-center gap-2">
                            <FaEnvelope />
                            {candidateEmail}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaBriefcase />
                            {application.experience || 0} year
                            {application.experience === 1
                              ? ""
                              : "s"}
                          </span>

                        </div>

                        {/* Matched Skills */}
                        <div className="mt-4">

                          <p className="text-xs text-zinc-500 mb-2">
                            Matched Skills
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {application.matchedSkills
                              ?.length > 0 ? (
                              application.matchedSkills.map(
                                (skill) => (
                                  <span
                                    key={skill}
                                    className="
                                      px-3
                                      py-1
                                      rounded-full
                                      bg-cyan-500/10
                                      border
                                      border-cyan-500/20
                                      text-cyan-400
                                      text-xs
                                    "
                                  >
                                    {skill}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-xs text-zinc-600">
                                No matched skills
                              </span>
                            )}

                          </div>

                        </div>

                      </div>

                      {/* ATS Score */}
                      <div className="text-center min-w-[110px]">

                        <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                          <FaChartLine />
                          ATS Score
                        </div>

                        <p
                          className={`text-3xl font-bold mt-1 ${getScoreStyle(
                            score
                          )}`}
                        >
                          {score}%
                        </p>

                      </div>

                      {/* Status */}
                      <div className="min-w-[110px]">

                        <p className="text-xs text-zinc-600 mb-2">
                          Status
                        </p>

                        <span className="inline-flex px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                          {application.status ||
                            "Applied"}
                        </span>

                      </div>

                      {/* View */}
                      <div>

                        <Link
                          to={`/recruiter/applications/${application._id}`}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            bg-zinc-800
                            hover:bg-zinc-700
                            px-4
                            py-3
                            rounded-lg
                            text-sm
                            transition
                          "
                        >
                          <FaEye />
                          View
                        </Link>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default CandidateRanking;
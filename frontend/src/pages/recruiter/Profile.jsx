import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaSave,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../../services/api";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    headline: "",
    location: "",
    bio: "",
    company: "",
  });

  // ==========================================
  // Fetch Recruiter Profile
  // ==========================================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/auth/profile");

      const user = response.data.data;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        headline: user.headline || "",
        location: user.location || "",
        bio: user.bio || "",
        company: user.company || "",
      });
    } catch (error) {
      console.error("Profile loading error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Handle Input
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Update Profile
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await api.put(
        "/auth/profile",
        profile
      );

      const updatedUser = response.data.data;

      setProfile({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        headline: updatedUser.headline || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
        company: updatedUser.company || "",
      });

      // Update localStorage user data
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          name: updatedUser.name,
          email: updatedUser.email,
        })
      );

      toast.success(
        "Profile updated successfully!"
      );

      setEditing(false);
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center">
        <p className="text-zinc-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-6 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* ======================================
            Header
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Recruiter Profile
            </h1>

            <p className="text-zinc-500 mt-2">
              Manage your recruiter and company information
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-5
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              <FaEdit />
              Edit Profile
            </button>
          )}

        </div>


        {/* ======================================
            Profile Card
        ====================================== */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

          {/* Profile Header */}

          <div className="
            bg-gradient-to-r
            from-cyan-500/10
            to-transparent
            border-b
            border-zinc-800
            p-6
          ">

            <div className="flex items-center gap-5">

              <div className="
                w-20
                h-20
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500/20
                flex
                items-center
                justify-center
              ">
                <FaBuilding className="text-cyan-400 text-3xl" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {profile.name || "Recruiter"}
                </h2>

                <p className="text-zinc-400 mt-1">
                  {profile.headline ||
                    "Recruiter"}
                </p>

                {profile.company && (
                  <p className="text-cyan-400 text-sm mt-1">
                    {profile.company}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* ======================================
              Form
          ====================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-8"
          >

            {/* Personal Information */}

            <div>

              <h3 className="text-lg font-semibold mb-5">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Name */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <FaUser className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your name"
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        focus:border-cyan-500
                        outline-none
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        placeholder:text-zinc-600
                        disabled:opacity-60
                      "
                    />

                  </div>
                </div>


                {/* Email */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Email
                  </label>

                  <div className="relative">

                    <FaEnvelope className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      disabled
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        opacity-60
                      "
                    />

                  </div>
                </div>


                {/* Phone */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Phone
                  </label>

                  <div className="relative">

                    <FaPhone className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter phone number"
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        focus:border-cyan-500
                        outline-none
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        placeholder:text-zinc-600
                        disabled:opacity-60
                      "
                    />

                  </div>
                </div>


                {/* Location */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Location
                  </label>

                  <div className="relative">

                    <FaMapMarkerAlt className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="City, Country"
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        focus:border-cyan-500
                        outline-none
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        placeholder:text-zinc-600
                        disabled:opacity-60
                      "
                    />

                  </div>
                </div>

              </div>

            </div>


            {/* ======================================
                Company Information
            ====================================== */}

            <div>

              <h3 className="text-lg font-semibold mb-5">
                Company Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Company */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Company
                  </label>

                  <div className="relative">

                    <FaBuilding className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="text"
                      name="company"
                      value={profile.company}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Company name"
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        focus:border-cyan-500
                        outline-none
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        placeholder:text-zinc-600
                        disabled:opacity-60
                      "
                    />

                  </div>
                </div>


                {/* Headline */}

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Professional Headline
                  </label>

                  <div className="relative">

                    <FaBriefcase className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    " />

                    <input
                      type="text"
                      name="headline"
                      value={profile.headline}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="e.g. Senior Talent Acquisition Specialist"
                      className="
                        w-full
                        bg-zinc-800
                        border border-zinc-700
                        focus:border-cyan-500
                        outline-none
                        rounded-xl
                        py-3
                        pl-11
                        pr-4
                        text-white
                        placeholder:text-zinc-600
                        disabled:opacity-60
                      "
                    />

                  </div>
                </div>

              </div>

            </div>


            {/* ======================================
                Bio
            ====================================== */}

            <div>

              <label className="block text-sm text-zinc-400 mb-2">
                About / Bio
              </label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!editing}
                rows="5"
                placeholder="Tell candidates about yourself or your recruitment role..."
                className="
                  w-full
                  bg-zinc-800
                  border border-zinc-700
                  focus:border-cyan-500
                  outline-none
                  rounded-xl
                  p-4
                  text-white
                  placeholder:text-zinc-600
                  disabled:opacity-60
                  resize-none
                "
              />

            </div>


            {/* ======================================
                Buttons
            ====================================== */}

            {editing && (
              <div className="
                flex
                flex-col
                sm:flex-row
                justify-end
                gap-3
                pt-5
                border-t
                border-zinc-800
              ">

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    fetchProfile();
                  }}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-zinc-700
                    text-zinc-300
                    hover:bg-zinc-800
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-cyan-500
                    hover:bg-cyan-400
                    disabled:opacity-50
                    text-black
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  <FaSave />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>
            )}

          </form>

        </div>

      </div>

    </div>
  );
};

export default Profile;
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      default: "Full Time",
    },

    experience: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    benefits: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Open", "Closed", "Archived"],
      default: "Open",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
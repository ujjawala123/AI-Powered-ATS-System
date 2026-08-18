const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resumeURL: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    candidateName: {
      type: String,
      default: "",
    },

    candidateEmail: {
      type: String,
      default: "",
    },

    candidatePhone: {
      type: String,
      default: "",
    },

    // Candidate experience in years
    experience: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Offered",
        "Rejected",
      ],
      default: "Applied",
    },
interviewDate: {
  type: Date,
  default: null,
},

interviewTime: {
  type: String,
  default: "",
},

interviewLink: {
  type: String,
  default: "",
},

interviewNotes: {
  type: String,
  default: "",
},
    matchScore: {
      type: Number,
      default: 0,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    matchedSkills: [
      {
        type: String,
      },
    ],

    missingSkills: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);
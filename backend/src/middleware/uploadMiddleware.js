const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==========================================
// Resume Upload Directory
// ==========================================

const uploadDir = path.resolve(
  __dirname,
  "../../uploads/resumes"
);

// Check whether the path already exists
if (fs.existsSync(uploadDir)) {
  const stats = fs.statSync(uploadDir);

  // If it exists but is NOT a directory
  if (!stats.isDirectory()) {
    throw new Error(
      `Upload path exists but is not a directory: ${uploadDir}`
    );
  }
} else {
  // Create directory
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

console.log("📁 Resume upload directory:", uploadDir);

// ==========================================
// Storage
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ==========================================
// File Filter
// ==========================================

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, DOC, and DOCX files are allowed."
      ),
      false
    );
  }
};

// ==========================================
// Multer Configuration
// ==========================================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
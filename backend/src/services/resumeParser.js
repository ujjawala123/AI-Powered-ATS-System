const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const parseResume = async (file) => {
  if (!file) {
    throw new Error("Resume file is required.");
  }

  const filePath = path.resolve(file.path);
  const extension = path.extname(file.originalname).toLowerCase();

  let resumeText = "";

  switch (extension) {
    case ".pdf": {
      const buffer = fs.readFileSync(filePath);
      const data = await pdf(buffer);
      resumeText = data.text;
      break;
    }

    case ".docx": {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      resumeText = result.value;
      break;
    }

    default:
      throw new Error("Only PDF and DOCX files are supported.");
  }

  return resumeText.trim();
};

module.exports = {
  parseResume,
};
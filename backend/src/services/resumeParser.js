const fs = require("fs");
const { PDFParse } = require("pdf-parse");

// ==========================================
// Parse Resume
// ==========================================

const parseResume = async (resumeFile) => {
  if (!resumeFile) {
    return "";
  }

  try {
    // Read uploaded PDF
    const buffer = fs.readFileSync(resumeFile.path);

    // Create PDF parser
    const parser = new PDFParse({
      data: buffer,
    });

    // Extract text
    const result = await parser.getText();

    // Clean up parser resources
    await parser.destroy();

    return result.text || "";
  } catch (error) {
    console.error("Resume parsing error:", error);
    throw new Error("Failed to parse resume.");
  }
};

module.exports = {
  parseResume,
};
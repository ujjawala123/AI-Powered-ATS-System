const { extractSkills } = require("../utils/extractSkills");

// Normalize skill names for better matching
const normalizeSkill = (skill) => {
  return skill
    .toLowerCase()
    .replace(/[.\-_+#]/g, "")
    .replace(/\s+/g, "")
    .trim();
};

// Calculate ATS Score
const calculateATSScore = (
  resumeText,
  requiredSkills = []
) => {
  if (!resumeText) {
    throw new Error("Resume text is required.");
  }

  // Extract skills from resume
  const resumeSkills = extractSkills(resumeText);

  const matchedSkills = [];
  const missingSkills = [];

  // Normalize resume skills once
  const normalizedResumeSkills = resumeSkills.map(
    (skill) => ({
      original: skill,
      normalized: normalizeSkill(skill),
    })
  );

  requiredSkills.forEach((skill) => {
    const normalizedRequiredSkill =
      normalizeSkill(skill);

    const found = normalizedResumeSkills.some(
      (resumeSkill) =>
        resumeSkill.normalized ===
        normalizedRequiredSkill
    );

    if (found) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Calculate score
  const atsScore =
    requiredSkills.length === 0
      ? 0
      : Math.round(
          (matchedSkills.length /
            requiredSkills.length) *
            100
        );

  return {
    atsScore,
    matchedSkills,
    missingSkills,
    resumeSkills,
  };
};

module.exports = {
  calculateATSScore,
};
const { extractSkills } = require("../utils/extractSkills");

const calculateATSScore = (resumeText, requiredSkills = []) => {
  if (!resumeText) {
    throw new Error("Resume text is required.");
  }

  // Extract skills from resume
  const resumeSkills = extractSkills(resumeText);

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    const found = resumeSkills.some(
      (resumeSkill) =>
        resumeSkill.toLowerCase() === skill.toLowerCase()
    );

    if (found) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const atsScore =
    requiredSkills.length === 0
      ? 0
      : Math.round(
          (matchedSkills.length / requiredSkills.length) * 100
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
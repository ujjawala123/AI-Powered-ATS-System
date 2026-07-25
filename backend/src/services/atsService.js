const calculateATSScore = (resumeText, requiredSkills = []) => {
  if (!resumeText) {
    throw new Error("Resume text is required.");
  }

  const resume = resumeText.toLowerCase();

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    if (resume.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const atsScore =
    requiredSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  return {
    atsScore,
    matchedSkills,
    missingSkills,
  };
};

module.exports = {
  calculateATSScore,
};
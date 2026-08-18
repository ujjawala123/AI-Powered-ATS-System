const extractCandidateDetails = (resumeText) => {
  // =====================================================
  // Extract Email
  // =====================================================
  const email =
    resumeText.match(
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    )?.[0] || "";

  // =====================================================
  // Extract Phone
  // =====================================================
  const phone =
    resumeText.match(
      /(\+?\d{1,3}[- ]?)?\d{10}/
    )?.[0] || "";

  // =====================================================
  // Split Resume Into Lines
  // =====================================================
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // =====================================================
  // Extract Name
  // =====================================================
  const name = lines.length
    ? lines[0]
    : "";

  // =====================================================
  // Extract Experience
  // Supports:
  // 2 years experience
  // 3+ years of experience
  // 5 yrs experience
  // 4 years of experience
  // =====================================================
  let experience = 0;

  const experienceMatch = resumeText.match(
    /(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i
  );

  if (experienceMatch) {
    experience = Number(experienceMatch[1]);
  }

  // =====================================================
  // Return Candidate Details
  // =====================================================
  return {
    name,
    email,
    phone,
    experience,
  };
};

module.exports = {
  extractCandidateDetails,
};
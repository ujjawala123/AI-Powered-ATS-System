const extractCandidateDetails = (resumeText) => {
  const email =
    resumeText.match(
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    )?.[0] || "";

  const phone =
    resumeText.match(
      /(\+?\d{1,3}[- ]?)?\d{10}/
    )?.[0] || "";

  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const name = lines.length ? lines[0] : "";

  return {
    name,
    email,
    phone,
  };
};

module.exports = {
  extractCandidateDetails,
};
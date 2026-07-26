const COMMON_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Python",
  "Java",
  "C++",
  "C",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Azure",
  "REST API",
  "Redux",
  "Next.js",
];

const extractSkills = (resumeText = "") => {
  const text = resumeText.toLowerCase();

  return COMMON_SKILLS.filter((skill) =>
    text.includes(skill.toLowerCase())
  );
};

module.exports = {
  extractSkills,
};
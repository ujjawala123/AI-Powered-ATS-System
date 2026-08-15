
// Gemini AI Resume Analysis Service
const generateAISummary = async ({
  resumeText,
  jobTitle,
  jobDescription,
  matchedSkills = [],
  missingSkills = [],
  atsScore = 0,
}) => {
  if (!resumeText) {
    throw new Error("Resume text is required.");
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const prompt = `
You are an expert recruitment and resume analysis assistant.

Analyze the candidate's resume against the job requirements.

JOB TITLE:
${jobTitle || "Not provided"}

JOB DESCRIPTION:
${jobDescription || "Not provided"}

ATS SCORE:
${atsScore}%

MATCHED SKILLS:
${matchedSkills.join(", ") || "None"}

MISSING SKILLS:
${missingSkills.join(", ") || "None"}

CANDIDATE RESUME:
${resumeText}

Provide a concise professional candidate assessment.

Include:

1. Candidate Summary
2. Key Strengths
3. Missing or Weak Areas
4. Overall Recommendation

Do not invent information that is not present in the resume.
Base the assessment only on the provided resume and job information.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],

        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Gemini API Error:", result);

    throw new Error(
      result?.error?.message ||
        "Failed to generate AI analysis."
    );
  }

  const aiText =
    result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    throw new Error(
      "Gemini returned an empty AI response."
    );
  }

  return aiText.trim();
};

module.exports = {
  generateAISummary,
};
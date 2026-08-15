// ==========================================
// Gemini AI Resume Analysis Service
// ==========================================

const generateAISummary = async ({
  resumeText,
  jobTitle,
  jobDescription,
  matchedSkills = [],
  missingSkills = [],
  atsScore = 0,
}) => {
  // Validate resume
  if (!resumeText || !resumeText.trim()) {
    throw new Error("Resume text is required.");
  }

  // Validate API key
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  // ==========================================
  // Gemini Prompt
  // ==========================================

  const prompt = `
You are an expert recruitment and resume analysis assistant.

Analyze the candidate's resume against the job requirements.

JOB TITLE:
${jobTitle || "Not provided"}

JOB DESCRIPTION:
${jobDescription || "Not provided"}

CURRENT ATS SCORE:
${atsScore}%

MATCHED SKILLS:
${matchedSkills.length > 0 ? matchedSkills.join(", ") : "None"}

MISSING SKILLS:
${missingSkills.length > 0 ? missingSkills.join(", ") : "None"}

CANDIDATE RESUME:
${resumeText}

Provide a concise and professional candidate assessment.

Use the following structure:

Candidate Summary:
Write a short summary of the candidate's background and suitability.

Key Strengths:
- List the strongest relevant skills or experience.

Missing or Weak Areas:
- Mention skills or requirements that are missing or weak.

Overall Recommendation:
Give a short recommendation for the recruiter.

Important:
- Do not invent information.
- Use only information available in the resume and job details.
- Keep the response professional and concise.
`;

  try {
    // ==========================================
    // Call Gemini API
    // ==========================================

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

    // ==========================================
    // Handle Gemini API Errors
    // ==========================================

    if (!response.ok) {
      console.error(
        "Gemini API Error:",
        result
      );

      throw new Error(
        result?.error?.message ||
          "Gemini API request failed."
      );
    }

    // ==========================================
    // Extract AI Response
    // ==========================================

    const aiText =
      result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      console.error(
        "Unexpected Gemini response:",
        JSON.stringify(result, null, 2)
      );

      throw new Error(
        "Gemini returned an empty response."
      );
    }

    return aiText.trim();
  } catch (error) {
    console.error(
      "Gemini AI Analysis Error:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  generateAISummary,
};
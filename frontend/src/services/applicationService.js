import api from "./api";

// ===============================
// Apply for Job
// ===============================
export const applyForJob = async (jobId, formData) => {
  const response = await api.post(
    `/applications/apply/${jobId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===============================
// Get Applicants By Job
// ===============================
export const getApplicantsByJob = async (jobId) => {
  const response = await api.get(
    `/applications/job/${jobId}`
  );

  return response.data;
};

// ===============================
// Get Application By ID
// ===============================
export const getApplicationById = async (id) => {
  const response = await api.get(
    `/applications/${id}`
  );

  return response.data;
};
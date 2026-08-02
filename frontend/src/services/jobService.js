import api from "./api";

// Create Job
export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

// Get Recruiter's Jobs
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my-jobs");
  return response.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// Update Job
export const updateJob = async (id, data) => {
  const response = await api.put(`/jobs/${id}`, data);
  return response.data;
};
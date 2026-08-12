import axios from "axios";

const API = "http://localhost:5000/api/jobs";

const getToken = () => {
  return localStorage.getItem("token");
};

// Create Job - Recruiter
export const createJob = async (jobData) => {
  const response = await axios.post(API, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get Recruiter's Jobs
export const getMyJobs = async () => {
  const response = await axios.get(`${API}/my-jobs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get All Open Jobs - Applicant
export const getAllJobs = async () => {
  const response = await axios.get(API);

  return response.data;
};

// Get Single Job
export const getJobById = async (id) => {
  const response = await axios.get(`${API}/${id}`);

  return response.data;
};

// Update Job - Recruiter
export const updateJob = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Job - Recruiter
export const deleteJob = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
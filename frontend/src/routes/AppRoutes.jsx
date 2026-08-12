import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ApplicantDashboard from "../pages/applicant/ApplicantDashboard";
import Jobs from "../pages/applicant/Jobs";
import JobDetails from "../pages/applicant/JobDetails";
import ApplyJob from "../pages/applicant/ApplyJob";

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";
import ViewJob from "../pages/recruiter/ViewJob";
import EditJob from "../pages/recruiter/EditJob";
import Applicants from "../pages/recruiter/Applicants";
import ApplicationDetails from "../pages/recruiter/ApplicationDetails";
import ProtectedRoute from "../components/ProtectedRoute"; // Change path if needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Applicant */}
        <Route
          path="/applicant/dashboard"
          element={
            <ProtectedRoute allowedRole="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/applicant/jobs"element={<Jobs />}/>
        <Route path="/applicant/jobs/:id" element={<JobDetails />}/>
        <Route path="/applicant/jobs/:id/apply" element={<ApplyJob />}/>
        {/* Recruiter */}
        <Route path="/recruiter/dashboard"element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs/:id"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <ViewJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs/edit/:id"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
  path="/recruiter/jobs/:id/applicants"
  element={
    <ProtectedRoute allowedRole="recruiter">
      <Applicants />
    </ProtectedRoute>
  }
/>

      </Route>
    </Routes>
  );<Route
  path="/recruiter/applications/:id"
  element={
    <ProtectedRoute allowedRole="recruiter">
      <ApplicationDetails />
    </ProtectedRoute>
  }
/>
};

export default AppRoutes;
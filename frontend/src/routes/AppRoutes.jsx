import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ApplicantDashboard from "../pages/applicant/ApplicantDashboard";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/applicant/dashboard"
          element={<ApplicantDashboard />}
        />

        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
  path="/recruiter/post-job"
  element={<PostJob />}
/>

<Route
  path="/recruiter/jobs"
  element={<MyJobs />}
/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
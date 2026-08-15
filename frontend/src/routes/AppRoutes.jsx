import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Applicant
import ApplicantDashboard from "../pages/applicant/ApplicantDashboard";
import Jobs from "../pages/applicant/Jobs";
import JobDetails from "../pages/applicant/JobDetails";
import ApplyJob from "../pages/applicant/ApplyJob";
import Applications from "../pages/applicant/Applications";
import ApplicantApplicationDetails from "../pages/applicant/ApplicationDetails";
// Recruiter
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";
import ViewJob from "../pages/recruiter/ViewJob";
import EditJob from "../pages/recruiter/EditJob";
import Applicants from "../pages/recruiter/Applicants";
import ApplicationDetails from "../pages/recruiter/ApplicationDetails";
import ApplicationPipeline from "../pages/recruiter/ApplicationPipeline";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ==================================================
          PUBLIC ROUTES
          No Navbar / No Sidebar
      ================================================== */}

      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ==================================================
          AUTHENTICATED ROUTES
          MainLayout contains Navbar + Sidebar
      ================================================== */}

      <Route element={<MainLayout />}>

        {/* ==================================================
            APPLICANT
        ================================================== */}

        <Route
          path="/applicant/dashboard"
          element={
            <ProtectedRoute allowedRole="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/jobs"
          element={
            <ProtectedRoute allowedRole="applicant">
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/jobs/:id"
          element={
            <ProtectedRoute allowedRole="applicant">
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/jobs/:id/apply"
          element={
            <ProtectedRoute allowedRole="applicant">
              <ApplyJob />
            </ProtectedRoute>
          }
        />
      <Route
  path="/applicant/applications"
  element={
    <ProtectedRoute allowedRole="applicant">
      <Applications />
    </ProtectedRoute>
  }
/>
<Route
  path="/applicant/applications/:id"
  element={
    <ProtectedRoute allowedRole="applicant">
      <ApplicationDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/applicant/applications/:id"
  element={
    <ProtectedRoute allowedRole="applicant">
      <ApplicantApplicationDetails />
    </ProtectedRoute>
  }
/>

        {/* ==================================================
            RECRUITER
        ================================================== */}

        <Route
          path="/recruiter/dashboard"
          element={
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

        <Route
          path="/recruiter/applications/:id"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <ApplicationDetails />
            </ProtectedRoute>
          }
        />
<Route
  path="/recruiter/pipeline"
  element={
    <ProtectedRoute allowedRole="recruiter">
      <ApplicationPipeline />
    </ProtectedRoute>
  }
/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
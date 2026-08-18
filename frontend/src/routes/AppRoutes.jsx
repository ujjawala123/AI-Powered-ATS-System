import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

// =====================================================
// APPLICANT PAGES
// =====================================================

import ApplicantDashboard from "../pages/applicant/ApplicantDashboard";
import Jobs from "../pages/applicant/Jobs";
import JobDetails from "../pages/applicant/JobDetails";
import ApplyJob from "../pages/applicant/ApplyJob";
import Applications from "../pages/applicant/Applications";
import ApplicantApplicationDetails from "../pages/applicant/ApplicationDetails";
import ApplicantProfile from "../pages/applicant/Profile";
// =====================================================
// RECRUITER PAGES
// =====================================================

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import RecruiterProfile from "../pages/recruiter/Profile";
import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";
import ViewJob from "../pages/recruiter/ViewJob";
import EditJob from "../pages/recruiter/EditJob";
import Applicants from "../pages/recruiter/Applicants";
import ApplicationDetails from "../pages/recruiter/ApplicationDetails";
import ApplicationPipeline from "../pages/recruiter/ApplicationPipeline";
import CandidateRanking from "../pages/recruiter/CandidateRanking";
import ScheduleInterview from "../pages/recruiter/ScheduleInterview";
// =====================================================
// APP ROUTES
// =====================================================

const AppRoutes = () => {
  return (
    <Routes>

      {/* =================================================
          PUBLIC ROUTES
          ================================================= */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* =================================================
          AUTHENTICATED ROUTES
          MainLayout = Navbar + Sidebar
          ================================================= */}

      <Route element={<MainLayout />}>

        {/* =================================================
            APPLICANT ROUTES
            ================================================= */}

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
              <ApplicantApplicationDetails />
            </ProtectedRoute>
          }
        />
<Route
  path="/applicant/profile"
  element={
    <ProtectedRoute allowedRole="applicant">
      <ApplicantProfile />
    </ProtectedRoute>
  }
/>

        {/* =================================================
            RECRUITER ROUTES
            ================================================= */}

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/recruiter/profile"
  element={
    <ProtectedRoute allowedRole="recruiter">
      <RecruiterProfile />
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
  path="/recruiter/applications/:id/schedule-interview"
  element={
    <ProtectedRoute allowedRole="recruiter">
      <ScheduleInterview />
    </ProtectedRoute>
  }
/>

        {/* =================================================
            WEEK 4
            APPLICATION PIPELINE
            ================================================= */}

        <Route
          path="/recruiter/pipeline"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <ApplicationPipeline />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            WEEK 4
            CANDIDATE RANKING DASHBOARD
            ================================================= */}

        <Route
          path="/recruiter/candidate-ranking"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <CandidateRanking />
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;
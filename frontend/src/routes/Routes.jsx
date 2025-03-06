import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Companies from "../pages/companies/CompanyList";
import CompanyDetails from "../pages/companies/CompanyDetail";
import Jobs from "../pages/jobs/JobList";
import LoginForm from "../pages/authentication/LoginForm";
import SignupForm from "../pages/authentication/SignupForm";
import Profile from "../pages/profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ login, signup, updateProfile }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      {/* Private Routes: Only accessible if logged in */}
      <Route element={<PrivateRoute />}>
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile updateProfile={updateProfile} />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;

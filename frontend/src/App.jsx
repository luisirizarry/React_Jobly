import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/NavBar";
import AppRoutes from "./routes/Routes";
import UserContext from "./pages/authentication/UserContext";
import useLocalStorageState from "./hooks/useLocalStorageState";
import JoblyApi from "./api/api";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorageState("token", null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Fetch user info when token changes
  useEffect(() => {
    async function getUser() {
      setInfoLoaded(false); // Start loading

      if (!token) {
        setCurrentUser(null);
        setAppliedJobs(new Set()); // Reset applied jobs
        setInfoLoaded(true);
        return;
      }

      try {
        JoblyApi.token = token; // Set token globally for API calls
        const { username } = jwtDecode(token);
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
        setAppliedJobs(new Set(user.applications)); // ✅ Use `user.applications`
      } catch (err) {
        console.error("Error loading user:", err);
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }

    getUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const token = await JoblyApi.getToken({ username, password });

      JoblyApi.token = token; 
      const user = await JoblyApi.getUser(username);

      setToken(token);
      setCurrentUser(user);
      setAppliedJobs(new Set(user.applications)); 

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      setToken(null);
      setCurrentUser(null);
      return false;
    }
  };

  const signup = async (username, password, firstName, lastName, email) => {
    try {
      const token = await JoblyApi.register({
        username,
        password,
        firstName,
        lastName,
        email,
      });

      JoblyApi.token = token;
      const user = await JoblyApi.getUser(username);

      setToken(token);
      setCurrentUser(user);
      setAppliedJobs(new Set(user.applications));

      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      setToken(null);
      setCurrentUser(null);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setAppliedJobs(new Set());
  };

  const updateProfile = async (username, updatedData) => {
    try {
      const user = await JoblyApi.updateProfile(username, updatedData);
      setCurrentUser(user);
      return true;
    } catch (err) {
      console.error("Profile update failed:", err);
      return false;
    }
  };

  // ✅ Fixed: `appliedJobs` correctly checks if a job was applied to
  function hasAppliedToJob(id) {
    return appliedJobs.has(id);
  }

  // ✅ Fixed: Prevent duplicate applications
  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;

    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setAppliedJobs(new Set([...appliedJobs, id])); // ✅ Use `appliedJobs`
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        hasAppliedToJob,
        applyToJob,
      }}
    >
      <BrowserRouter>
        <Navbar logout={logout} />
        <AppRoutes
          currentUser={currentUser}
          login={login}
          signup={signup}
          updateProfile={updateProfile}
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

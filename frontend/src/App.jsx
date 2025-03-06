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

  // Fetch user info when token changes
  useEffect(() => {
    async function getUser() {
      setInfoLoaded(false); // Start loading

      if (!token) {
        setCurrentUser(null);
        setInfoLoaded(true); // Stop loading if no token
        return;
      }

      try {
        JoblyApi.token = token; // Set token globally for API calls
        const { username } = jwtDecode(token);
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
      } catch (err) {
        console.error("Error loading user:", err);
        setCurrentUser(null);
      }
      setInfoLoaded(true); // Stop loading
    }

    getUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const token = await JoblyApi.getToken({ username, password });
      setToken(token);
  
      const user = await JoblyApi.getUser(username);
      setCurrentUser(user);
      
      return true; // Indicate success
    } catch (err) {
      console.error("Login failed:", err);
      return false; // Indicate failure
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
      setToken(token);
    } catch (err) {
      console.error(`Could not successfully register`, err);
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  // Show loading spinner while fetching user info
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      <BrowserRouter>
        <Navbar logout={logout} />
        <AppRoutes currentUser={currentUser} login={login} signup={signup} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

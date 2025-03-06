import { useEffect, useState } from "react";

function TestConnection() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ping`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error:", error);
        setMessage("Error connecting to backend.");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Backend Test</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestConnection;

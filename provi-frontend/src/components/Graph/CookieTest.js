"use client";
import { React, useState } from "react";

const CookieTest = () => {
  const [authMessage, setAuthMessage] = useState("");
  const [testMessage, setTestMessage] = useState("");

  const getAuthCookie = async () => {
    try {
      const response = await fetch(`http://pm-vis.uni-mannheim.de:1234/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data), // Add this when sending data later
      });

      if (response.ok) {
        setAuthMessage(`Auth request successful. Cookie received.`);
      } else {
        setAuthMessage(`Auth request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during auth request:", error);
      setAuthMessage(`Auth request error: ${error.message}`);
    }
  };

  // Function to handle GET /auth/test
  const testAuthCookie = async () => {
    const response = await fetch(
      `http://pm-vis.uni-mannheim.de:1234/auth/test`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setTestMessage(data.message);
  };

  return (
    <div>
      <h1>Authentication Test</h1>

      <button onClick={getAuthCookie}>Get Auth Cookie</button>
      <p>{authMessage}</p>

      <button onClick={testAuthCookie}>Test Cookie</button>
      <p>{testMessage}</p>
    </div>
  );
};

export default CookieTest;

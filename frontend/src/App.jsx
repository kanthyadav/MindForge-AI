import { useEffect, useState } from "react";
import "./App.css";

import API from "./services/api";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import SessionCard from "./components/SessionCard";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [isLogin, setIsLogin] =
    useState(true);

  const [sessions, setSessions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    if (token) {
      fetchSessions();
    }
  }, [token]);

  const fetchSessions = async () => {
    try {
      const res = await API.get(
        "/sessions"
      );

      setSessions(
        res.data.sessions || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!token) {
    return isLogin ? (
      <Login
        setToken={setToken}
        setIsLogin={setIsLogin}
      />
    ) : (
      <Register
        setToken={setToken}
        setIsLogin={setIsLogin}
      />
    );
  }

  const filteredSessions =
    sessions.filter((session) =>
      session.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="app">
      <Navbar setToken={setToken} />

      <div className="hero">
        <h1>🧠 MindForge AI</h1>

        <p>
          Convert lectures, meetings and
          interviews into AI-powered insights.
        </p>
      </div>

      <UploadSection
        fetchSessions={fetchSessions}
      />

      <input
        type="text"
        placeholder="🔍 Search Sessions..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "25px",
          fontSize: "16px",
        }}
      />

      <div className="sessions-section">
        <h2>Recent Sessions</h2>

        {filteredSessions.length ===
        0 ? (
          <div className="empty-card">
            <h3>
              🧠 No Sessions Found
            </h3>
          </div>
        ) : (
          filteredSessions.map(
            (session) => (
              <SessionCard
                key={session._id}
                session={session}
                fetchSessions={
                  fetchSessions
                }
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default App;
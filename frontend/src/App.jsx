import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBrain,
  FaFileAudio,
  FaLightbulb,
  FaFileAlt,
} from "react-icons/fa";
import "./App.css";

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        "https://mindforge-backend-api.onrender.com/api/sessions"
      );

      setSessions(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://mindforge-backend-api.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", res.data);

      await fetchSessions();

      setAudioFile(null);
    } catch (error) {
      console.error("Upload Error:", error);

      alert(
        error?.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="hero">
        <h1>
          <FaBrain /> MindForge AI
        </h1>

        <p>
          Convert lectures, meetings and
          interviews into AI-powered insights.
        </p>
      </div>

      <div className="upload-card">
        <h2>
          <FaFileAudio /> Upload Audio
        </h2>

        <div className="drop-zone">
          <input
            type="file"
            accept=".mp3,.wav,.m4a,.mpeg,.aac"
            onChange={(e) =>
              setAudioFile(e.target.files[0])
            }
          />

          {audioFile ? (
            <p>{audioFile.name}</p>
          ) : (
            <p>
              Drag & Drop Audio Here
              <br />
              or click to browse
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading
            ? "🧠 AI Analyzing..."
            : "Upload & Analyze"}
        </button>
      </div>

      <div className="sessions-section">
        <h2>Recent Sessions</h2>

        {sessions.length === 0 ? (
          <div className="empty-card">
            <h3>🧠 No Sessions Yet</h3>

            <p>
              Upload your first lecture,
              meeting, or interview recording
              to generate AI insights.
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className="session-card"
            >
              <div className="card-header">
                <h3>{session.title}</h3>

                <span className="badge">
                  📚 {session.contentType}
                </span>
              </div>

              <div className="section">
                <h4>
                  <FaFileAlt /> Summary
                </h4>

                <p>
                  {session.summary ||
                    "No summary generated"}
                </p>
              </div>

              <div className="section">
                <h4>
                  <FaLightbulb /> Key Points
                </h4>

                {session.keyPoints &&
                session.keyPoints.length > 0 ? (
                  <ul>
                    {session.keyPoints.map(
                      (point, index) => (
                        <li key={index}>
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>
                    No key points generated
                  </p>
                )}
              </div>

              <div className="date">
                {new Date(
                  session.createdAt
                ).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
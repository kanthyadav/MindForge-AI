import {
  FaFileAlt,
  FaLightbulb,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

import { jsPDF } from "jspdf";
import API from "../services/api";

function SessionCard({
  session,
  fetchSessions,
}) {
  const handleDelete = async () => {
    const confirmDelete =
      window.confirm(
        "Delete this session?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/sessions/${session._id}`
      );

      alert(
        "Session deleted successfully"
      );

      fetchSessions();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete session"
      );
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "MindForge AI Notes",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Title: ${session.title}`,
      20,
      40
    );

    doc.text(
      "Summary:",
      20,
      60
    );

    const summary =
      doc.splitTextToSize(
        session.summary ||
          "No summary generated",
        170
      );

    doc.text(summary, 20, 70);

    let y =
      80 + summary.length * 7;

    doc.text(
      "Key Points:",
      20,
      y
    );

    y += 10;

    if (
      session.keyPoints &&
      session.keyPoints.length > 0
    ) {
      session.keyPoints.forEach(
        (point) => {
          const lines =
            doc.splitTextToSize(
              `• ${point}`,
              170
            );

          doc.text(lines, 20, y);

          y +=
            lines.length * 7 + 5;
        }
      );
    }

    doc.save(
      `${session.title}.pdf`
    );
  };

  return (
    <div className="session-card">
      <div className="card-header">
        <h3>{session.title}</h3>

        <span className="badge">
          {session.contentType}
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
        session.keyPoints.length >
          0 ? (
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

      <div className="session-actions">
        <button
          onClick={
            handleDownloadPDF
          }
        >
          <FaDownload /> Download
        </button>

        <button
          onClick={handleDelete}
        >
          <FaTrash /> Delete
        </button>
      </div>

      <div className="date">
        {new Date(
          session.createdAt
        ).toLocaleString()}
      </div>
    </div>
  );
}

export default SessionCard;
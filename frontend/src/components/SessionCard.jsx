import {
  FaFileAlt,
  FaLightbulb,
} from "react-icons/fa";

function SessionCard({ session }) {
  return (
    <div className="session-card">
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
          <p>No key points generated</p>
        )}
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
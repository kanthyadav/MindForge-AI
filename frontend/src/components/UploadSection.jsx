import { useState } from "react";
import API from "../services/api";
import { FaFileAudio } from "react-icons/fa";

function UploadSection({ fetchSessions }) {
  const [audioFile, setAudioFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!audioFile) {
      alert(
        "Please select an audio file"
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "audio",
      audioFile
    );

    try {
      setLoading(true);

      await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await fetchSessions();

      setAudioFile(null);

      alert(
        "Upload Successful"
      );
    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <h2>
        <FaFileAudio /> Upload Audio
      </h2>

      <div className="drop-zone">
        <input
          type="file"
          accept=".mp3,.wav,.m4a,.aac,.mpeg"
          onChange={(e) =>
            setAudioFile(
              e.target.files[0]
            )
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
  );
}

export default UploadSection;
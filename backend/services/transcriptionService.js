const client = require("./speechService");
const fs = require("fs");

const generateTranscript = async (filePath) => {
  try {
    console.log("Uploading audio to AssemblyAI...");

    const audioData = fs.readFileSync(filePath);

    const uploadUrl =
      await client.files.upload(audioData);

    console.log(
      "Audio uploaded successfully"
    );

    const transcript =
      await client.transcripts.transcribe({
        audio: uploadUrl,
        speech_model: "universal",
      });

    if (!transcript.text) {
      throw new Error(
        "No transcript generated"
      );
    }

    console.log(
      "Transcript generated successfully"
    );

    return transcript.text;
  } catch (error) {
    console.error(
      "Transcription Error:",
      error
    );

    throw error;
  }
};

module.exports = {
  generateTranscript,
};
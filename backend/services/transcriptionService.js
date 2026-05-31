const client = require("./speechService");
const fs = require("fs");

const generateTranscript = async (filePath) => {
  try {
    console.log("Uploading audio to AssemblyAI...");

    const audioData = fs.readFileSync(filePath);

    const uploadUrl = await client.files.upload(audioData);

    console.log("Audio uploaded successfully");

    const transcript = await client.transcripts.transcribe({
      audio: uploadUrl,
      speech_models: ["universal-2"],
    });

    console.log("Transcript generated");

    return transcript.text;
  } catch (error) {
    console.error("Transcription Error:");
    console.error(error);

    throw error;
  }
};

module.exports = {
  generateTranscript,
};
const genAI = require("./aiService");

const analyzeTranscript = async (transcript) => {
  try {
    console.log(
      "========== GEMINI STARTED =========="
    );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const prompt = `
Analyze the following transcript.

Return ONLY valid JSON.

{
  "contentType": "lecture",
  "summary": "Detailed summary here",
  "keyPoints": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5"
  ]
}

Rules:
- contentType must be one of:
lecture, meeting, interview, other

- summary must be between 150 and 250 words

- generate 5 to 8 key points

- return ONLY JSON

Transcript:
${transcript}
`;

    const result =
      await model.generateContent(prompt);

    console.log(
      "========== GEMINI RESPONSE RECEIVED =========="
    );

    let content =
      result.response.text();

    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log(content);

    const parsedData =
      JSON.parse(content);

    return {
      contentType:
        parsedData.contentType ||
        "other",

      summary:
        parsedData.summary ||
        "No summary generated",

      keyPoints:
        Array.isArray(
          parsedData.keyPoints
        )
          ? parsedData.keyPoints
          : [],
    };
  } catch (error) {
    console.error(
      "========== GEMINI ERROR =========="
    );

    console.error(error);

    return {
      contentType: "other",
      summary:
        "Analysis failed due to AI service error.",
      keyPoints: [
        "Unable to generate insights",
      ],
    };
  }
};

module.exports = {
  analyzeTranscript,
};
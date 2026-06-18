const genAI = require("./aiService");

const analyzeTranscript = async (transcript) => {
  try {
    const prompt = `
Analyze the following transcript.

Return ONLY a valid JSON object.

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
- no markdown
- no explanations

Transcript:
${transcript}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result =
      await model.generateContent(prompt);

    let content =
      result.response.text();

    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "========== GEMINI RESPONSE =========="
    );
    console.log(content);
    console.log(
      "====================================="
    );

    let parsedData;

    try {
      parsedData = JSON.parse(content);
    } catch (parseError) {
      console.error(
        "JSON Parse Error:",
        parseError
      );

      return {
        contentType: "other",
        summary:
          "AI generated response could not be parsed.",
        keyPoints: [
          "Transcript processed successfully",
        ],
      };
    }

    return {
      contentType:
        parsedData.contentType || "other",

      summary:
        parsedData.summary ||
        "No summary generated",

      keyPoints:
        Array.isArray(
          parsedData.keyPoints
        )
          ? parsedData.keyPoints
          : ["No key points generated"],
    };
  } catch (error) {
    console.error(
      "AI Analysis Error:",
      error
    );

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
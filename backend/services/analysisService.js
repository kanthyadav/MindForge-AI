const client = require("./aiService");

const analyzeTranscript = async (transcript) => {
  try {
    const prompt = `
Analyze the transcript.

Return ONLY valid JSON.

Categories for contentType:
- lecture
- meeting
- interview
- other

Generate:
1. contentType
2. A detailed summary between 150 and 250 words
3. 5 to 8 key points

Format:

{
  "contentType": "",
  "summary": "",
  "keyPoints": []
}

Rules:
- Choose ONLY one contentType from lecture, meeting, interview, other.
- Summary should be detailed and easy to understand.
- Generate 5 to 8 key points.
- Each key point should be short and clear.
- Return only JSON.
- Do not use markdown.
- Do not wrap JSON in code blocks.

Transcript:
${transcript}
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let content = response.choices[0].message.content;

    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("AI RESPONSE:");
    console.log(content);

    const parsedData = JSON.parse(content);

    return {
      contentType: parsedData.contentType || "other",
      summary: parsedData.summary || "",
      keyPoints: parsedData.keyPoints || [],
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);

    return {
      contentType: "other",
      summary: "",
      keyPoints: [],
    };
  }
};

module.exports = {
  analyzeTranscript,
};
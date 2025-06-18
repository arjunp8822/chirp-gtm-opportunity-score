import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use API routes instead
});

export const analyzeDealData = async (dealText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert sales deal evaluator with deep experience in B2B sales, customer success, and deal qualification. Your task is to analyze sales call transcripts, email threads, meeting notes, or any deal-related text and provide a comprehensive opportunity score assessment.

You must return ONLY a valid JSON object with the following structure:
{
  "technographicFit": <integer 0-100>,
  "psychographicFit": <integer 0-100>,
  "problemSolutionFit": <integer 0-100>,
  "relationshipHeat": <integer 0-100>,
  "momentum": <integer 0-100>,
  "risk": <integer 0-100>,
  "historicalPatternMatch": <integer 0-100>,
  "summary": "<2-3 sentence summary of the deal>",
  "recommendations": ["<action item 1>", "<action item 2>", "<action item 3>"]
}

Scoring Guidelines:
- Technographic Fit (0-100): How well the prospect's technology stack, tools, and digital maturity align with your solution. Higher scores for companies using modern, compatible technologies.
- Psychographic Fit (0-100): Alignment with values, attitudes, and decision-making style. Higher scores for prospects who value innovation, efficiency, and ROI.
- Problem/Solution Fit (0-100): How clearly the prospect's pain points match your solution's capabilities. Higher scores for well-defined problems with clear solution fit.
- Relationship Heat (0-100): Strength and engagement level of the relationship. Higher scores for warm relationships with multiple stakeholders engaged.
- Momentum (0-100): Positive forward movement in the deal. Higher scores for consistent progress, scheduled next steps, and growing interest.
- Risk (0-100): Factors that could derail the deal. LOWER scores are better (0 = low risk, 100 = high risk).
- Historical Pattern Match (0-100): How well this deal matches patterns of previously successful deals. Higher scores for deals following proven paths to success.

Be realistic and conservative in your scoring. Consider the quality and quantity of information provided.`,
        },
        {
          role: "user",
          content: `Analyze this deal data and provide the JSON assessment:

${dealText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from OpenAI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    const requiredFields = [
      "technographicFit",
      "psychographicFit",
      "problemSolutionFit",
      "relationshipHeat",
      "momentum",
      "risk",
      "historicalPatternMatch",
      "summary",
      "recommendations",
    ];

    for (const field of requiredFields) {
      if (analysis[field] === undefined) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return analysis;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Analysis failed: ${error.message}`);
  }
};

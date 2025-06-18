import { calculateOpportunityScore } from "@/lib/utils";
import ScoreCard from "./ScoreCard";
import Button from "./Button";

export default function ResultsScreen({
  analysis,
  onReset,
  onGetRecommendations,
}) {
  const opportunityScore = calculateOpportunityScore(analysis);

  const scoreCards = [
    { label: "Technographic Fit", score: analysis.technographicFit },
    { label: "Psychographic Fit", score: analysis.psychographicFit },
    { label: "Problem/Solution Fit", score: analysis.problemSolutionFit },
    { label: "Relationship Heat", score: analysis.relationshipHeat },
    { label: "Momentum", score: analysis.momentum },
    { label: "Risk", score: analysis.risk, isRisk: true },
    {
      label: "Historical Pattern Match",
      score: analysis.historicalPatternMatch,
    },
  ];

  const getScoreCategory = (score) => {
    if (score >= 80)
      return { label: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 60)
      return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    if (score >= 40)
      return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { label: "Poor", color: "text-red-600", bg: "bg-red-50" };
  };

  const scoreCategory = getScoreCategory(opportunityScore);

  return (
    <div className="flex flex-col justify-center items-center max-w-6xl mx-auto min-h-screen gap-8 px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-color)]">
          Opportunity Analysis Complete
        </h1>
        <p className="text-lg text-[var(--brand-color-50)]">
          Here's your comprehensive deal assessment
        </p>
      </div>

      <div className="w-full space-y-8">
        {/* Main Score */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Overall Opportunity Score
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className={`text-6xl font-bold ${scoreCategory.color}`}>
                {opportunityScore}
              </div>
              <div className="text-2xl text-gray-400">/100</div>
            </div>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${scoreCategory.bg} ${scoreCategory.color}`}
            >
              {scoreCategory.label} Opportunity
            </div>
          </div>
        </div>

        {/* Summary */}
        {analysis.summary && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Deal Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>
        )}

        {/* Detailed Scores */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Detailed Assessment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreCards.map((card, index) => (
              <ScoreCard
                key={index}
                label={card.label}
                score={card.score}
                isRisk={card.isRisk}
              />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Actions
            </h3>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[var(--secondary-color)] text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onReset} variant="outline" size="lg">
            Analyse Another Deal
          </Button>
          <Button onClick={onGetRecommendations} variant="primary" size="lg">
            Get Detailed Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
}

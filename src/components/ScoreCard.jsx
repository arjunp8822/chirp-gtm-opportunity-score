import { getScoreColor, getScoreLabel } from "@/lib/utils";

export default function ScoreCard({
  label,
  score,
  isRisk = false,
  className = "",
}) {
  const displayScore = isRisk ? 100 - score : score;
  const scoreColor = getScoreColor(score, isRisk);
  const scoreLabel = getScoreLabel(score, isRisk);

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{label}</h3>
          <p className="text-xs text-gray-500 mt-1">{scoreLabel}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">
            {displayScore}
          </span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`${scoreColor} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${displayScore}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}

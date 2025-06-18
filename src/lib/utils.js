import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const calculateOpportunityScore = (scores) => {
  // Define weights for each factor (total should sum to 1)
  const weights = {
    technographicFit: 0.15,
    psychographicFit: 0.1,
    problemSolutionFit: 0.25,
    relationshipHeat: 0.15,
    momentum: 0.2,
    risk: 0.1, // risk is inverted below
    historicalPatternMatch: 0.05,
  };

  // Calculate weighted score, inverting risk since lower risk is better
  const weightedScore =
    (scores.technographicFit ?? 0) * weights.technographicFit +
    (scores.psychographicFit ?? 0) * weights.psychographicFit +
    (scores.problemSolutionFit ?? 0) * weights.problemSolutionFit +
    (scores.relationshipHeat ?? 0) * weights.relationshipHeat +
    (scores.momentum ?? 0) * weights.momentum +
    (100 - (scores.risk ?? 100)) * weights.risk + // invert risk safely
    (scores.historicalPatternMatch ?? 0) * weights.historicalPatternMatch;

  return Math.round(weightedScore);
};

export const getScoreColor = (score, isRisk = false) => {
  const value = isRisk ? 100 - score : score;

  if (value >= 80) return "bg-green-500";
  if (value >= 60) return "bg-yellow-500";
  if (value >= 40) return "bg-orange-500";
  return "bg-red-500";
};

export const getScoreLabel = (score, isRisk = false) => {
  const value = isRisk ? 100 - score : score;

  if (value >= 80) return "Excellent";
  if (value >= 60) return "Good";
  if (value >= 40) return "Fair";
  return "Poor";
};

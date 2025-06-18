"use client";

import { useState } from "react";
import { analyzeDealData } from "@/lib/openai";
import InputScreen from "@/components/InputScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import EmailCapture from "@/components/EmailCapture";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("input");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (dealText) => {
    setLoading(true);
    setError(null);
    setCurrentScreen("loading");

    try {
      const result = await analyzeDealData(dealText);
      setAnalysis(result);
      setCurrentScreen("results");
    } catch (error) {
      console.error("Analysis failed:", error);
      setError(error.message);
      setCurrentScreen("input");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setCurrentScreen("input");
  };

  const handleGetRecommendations = () => {
    setCurrentScreen("email");
  };

  const handleEmailSubmit = async (userData) => {
    // In a real application, you would send this to your backend
    console.log("User data submitted:", userData);
    alert("Thank you! We'll send your detailed recommendations shortly.");
    setCurrentScreen("results");
  };

  const handleEmailBack = () => {
    setCurrentScreen("results");
  };

  // Error handling
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Analysis Failed
          </h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render appropriate screen based on current state
  switch (currentScreen) {
    case "input":
      return <InputScreen onSubmit={handleSubmit} loading={loading} />;

    case "loading":
      return <LoadingScreen />;

    case "results":
      return (
        <ResultsScreen
          analysis={analysis}
          onReset={handleReset}
          onGetRecommendations={handleGetRecommendations}
        />
      );

    case "email":
      return (
        <EmailCapture onBack={handleEmailBack} onSubmit={handleEmailSubmit} />
      );

    default:
      return <InputScreen onSubmit={handleSubmit} loading={loading} />;
  }
}

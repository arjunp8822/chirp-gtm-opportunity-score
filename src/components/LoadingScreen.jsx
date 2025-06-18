import { useState, useEffect } from "react";

const loadingSteps = [
  "Analyzing deal context and stakeholders",
  "Evaluating technographic fit",
  "Assessing psychographic alignment",
  "Measuring problem-solution fit",
  "Calculating relationship strength",
  "Analyzing deal momentum",
  "Identifying potential risks",
  "Comparing to historical patterns",
  "Computing final opportunity score",
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto min-h-screen gap-8 px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-color)]">
          Opportunity score is flying in
        </h1>
        <p className="text-lg text-[var(--brand-color-50)]">
          Analysing your deal data with advanced AI...
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            {loadingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {index <= currentStep ? (
                    <div className="w-6 h-6 bg-[var(--secondary-color)] rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    index <= currentStep
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {index === currentStep && (
                  <div className="ml-auto">
                    <div className="animate-spin w-4 h-4 border-2 border-[var(--secondary-color)] border-t-transparent rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="animate-pulse">🤖</div>
            <span>AI is processing your data...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Spinner from "@/components/Spinner";
import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";

export default function Home() {
  const textareaRef = useRef(null);
  const [display, setDisplay] = useState("chat");
  const [inputText, setInputText] = useState("");

  const [technographicFit, setTechnographicFit] = useState(null);
  const [psychographicFit, setPsychographicFit] = useState(null);
  const [problemSolutionFit, setProblemSolutionFit] = useState(null);
  const [relationshipHeat, setRelationshipHeat] = useState(null);
  const [momentum, setMomentum] = useState(null);
  const [risk, setRisk] = useState(null);
  const [historicalPatternMatch, setHistoricalPatternMatch] = useState(null);
  const [opportunityScore, setOpportunityScore] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "100px";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  };

  const submitHandler = async () => {
    setDisplay("loading");

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2",
          messages: [
            {
              role: "system",
              content: `
  You are an expert deal evaluator. 
  Your job is to assess sales call transcripts and output a JSON object with the following numeric scores (integers between 0 and 100):
  {
    "technographicFit": 0-100,
    "psychographicFit": 0-100,
    "problemSolutionFit": 0-100,
    "relationshipHeat": 0-100,
    "momentum": 0-100,
    "risk": 0-100,
    "historicalPatternMatch": 0-100
  }

  Technographic fit refers to how well a company's technology stack, tools, and digital maturity align with the product or service being offered. It's often used in sales and marketing to assess whether a potential customer is likely to benefit from and adopt your product based on the technologies they already use.
  Psychographic fit refers to how well a potential customer or company aligns with the values, attitudes, interests, and behaviors that your product, brand, or company embodies. 
  Problem/Solution Fit is an early and critical concept in building a successful product or business. It answers the question: "Does the solution you’re offering effectively solve a real, important problem for a customer?"
  Relationship heat is an informal term often used in sales, business development, and networking to describe the strength, warmth, or engagement level of a relationship between two parties.
  Momentum refers to the positive forward movement and energy in a deal or sales process — when interactions are happening consistently, interest is building, and progress toward closing is accelerating.
  Risk refers to anything that could cause a deal to stall, shrink, or fall apart entirely — from the buyer’s perspective and from your perspective as a seller.
  In a sales context, historical pattern match refers to the practice of comparing a current prospect or deal to past deals that successfully closed (or failed) — to predict how likely this one is to close and what actions will help.

  Higher is better for all categories, EXCEPT risk (where lower is better).
  Do not include any explanation. Return ONLY valid JSON.
              `,
            },
            {
              role: "user",
              content: `Here is the text: """${inputText.trim()}"""\n\nPlease return only the JSON object.`,
            },
          ],
          stream: false,
        }),
      });

      const data = await response.json();
      const jsonMatch = data.message.content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const scores = JSON.parse(jsonMatch[0]);

        setTechnographicFit(scores.technographicFit ?? 0);
        setPsychographicFit(scores.psychographicFit ?? 0);
        setProblemSolutionFit(scores.problemSolutionFit ?? 0);
        setRelationshipHeat(scores.relationshipHeat ?? 0);
        setMomentum(scores.momentum ?? 0);
        setRisk(scores.risk ?? 0);
        setHistoricalPatternMatch(scores.historicalPatternMatch ?? 0);

        // Define weights for each factor (total should sum to 1)
        // These weights reflect importance in opportunity scoring:
        // Problem/Solution Fit and Momentum tend to be most predictive
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

        const opportunityScore = weightedScore.toFixed(0);

        setOpportunityScore(opportunityScore);
        setDisplay("result");
      } else {
        throw new Error("Could not parse JSON from LLM response.");
      }
    } catch (error) {
      console.error("Error communicating with Ollama:", error);
      setDisplay("chat");
    }
  };

  return (
    <div>
      {display === "chat" && (
        <div className="flex flex-col justify-center items-center max-w-[1000px] mx-auto h-screen gap-4 md:gap-8 px-4">
          <h1 className="heading text-2xl md:text-4xl font-bold">
            Boost your deal intelligence with{" "}
            <span className="text-[var(--secondary-color)]">Chirp AI</span>
          </h1>
          <p className="paragraph text-md md:text-lg">
            Paste your deal notes or upload your call transcripts, email
            threads, Slack chats, or WhatsApp conversations. The more context
            you provide, the richer the AI insights.
          </p>
          <div className="w-full border border-gray-300 rounded-md flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              className="w-full min-h-[100px] max-h-[300px] p-4 resize-none overflow-auto focus:outline-none focus:ring-0 focus:border-transparent rounded-md"
              placeholder="Add all your text here"
              onInput={handleInput}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-between items-center w-full px-3 pb-2">
              <button className="bg-[var(--brand-color)] text-white rounded-md px-3 py-2 flex gap-1 justify-center items-center cursor-pointer">
                <GoPlus />
                <p>Add file</p>
              </button>
              <button
                className="rounded-md px-3 py-2 bg-[var(--secondary-color)] text-white cursor-pointer"
                onClick={submitHandler}
              >
                Calculate opportunity score
              </button>
            </div>
          </div>
        </div>
      )}

      {display === "loading" && (
        <div className="flex flex-col justify-center items-center max-w-[1000px] mx-auto h-screen gap-4 md:gap-8 px-4">
          <h1 className="heading text-2xl md:text-4xl font-bold">
            Opportunity score is flying in
          </h1>
          <p className="paragraph text-md md:text-lg">
            Analysing your submitted text and documents...
          </p>
          <div className="flex flex-col gap-4 items-start">
            <div className="flex gap-2">
              <Spinner />
              <p className="whitespace-nowrap text-gray-500">
                Scanning technographic fit
              </p>
            </div>
            <div className="flex gap-2">
              <Spinner />
              <p className="whitespace-nowrap text-gray-500">
                Scanning psychographic
              </p>
            </div>
            <div className="flex gap-2">
              <Spinner />
              <p className="whitespace-nowrap text-gray-500">
                Scanning problem/solution fit
              </p>
            </div>
            <div className="flex gap-2">
              <Spinner />
              <p className="whitespace-nowrap text-gray-500">
                Compiling final score
              </p>
            </div>
          </div>
        </div>
      )}

      {display === "result" && (
        <div className="flex flex-col justify-center items-center max-w-[1000px] mx-auto h-screen gap-6 md:gap-10 px-4">
          <h1 className="heading text-2xl md:text-4xl font-bold">
            Opportunity score: {opportunityScore}/100
          </h1>

          <div className="flex flex-col gap-6 w-full max-w-md">
            {[
              { label: "Technographic Fit", value: technographicFit },
              { label: "Psychographic Fit", value: psychographicFit },
              { label: "Problem/Solution Fit", value: problemSolutionFit },
              { label: "Relationship Heat", value: relationshipHeat },
              { label: "Momentum", value: momentum },
              { label: "Risk (lower is better)", value: 100 - risk }, // inverted for visual bar
              {
                label: "Historical Pattern Match",
                value: historicalPatternMatch,
              },
            ].map((item, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.label.includes("Risk")
                      ? 100 - item.value
                      : item.value}
                    /100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[var(--secondary-color)] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-4 rounded-md px-4 py-2 bg-[var(--brand-color)] text-white cursor-pointer"
            onClick={() => setDisplay("email")}
          >
            Find out more
          </button>
        </div>
      )}

      {display === "email" && (
        <div className="flex flex-col justify-center items-center max-w-[1000px] mx-auto h-screen gap-4 md:gap-8 px-4">
          <h1 className="heading text-2xl md:text-4xl font-bold">
            Next best action
          </h1>
          <p className="paragraph text-md md:text-lg text-center">
            View the personalised action Chirp recommends to move this deal
            forward.
          </p>
          <div className="flex w-full gap-2 justify-center">
            <input
              type="email"
              placeholder="you@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
            />
            <button
              className="rounded-md px-6 py-3 bg-[var(--secondary-color)] text-white"
              onClick={() => {
                console.log("Email submitted:", userEmail); // Replace with real handler
                alert("Thanks! We'll be in touch soon.");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

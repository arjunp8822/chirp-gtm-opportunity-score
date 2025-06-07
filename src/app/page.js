"use client";

import { useRef } from "react";
import { GoPlus } from "react-icons/go";

export default function Home() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "100px"; // reset to minimum height first
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // grow up to 300px
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[1000px] mx-auto h-screen gap-4 md:gap-8 px-4">
      <h1 className="heading text-2xl md:text-4xl font-bold">
        Boost your deal intelligence with{" "}
        <span className="text-[var(--secondary-color)]">Chirp AI</span>
      </h1>
      <p className="paragraph text-md md:text-lg">
        Paste your deal notes or upload your call transcripts, email threads,
        Slack chats, or WhatsApp conversations. The more context you provide,
        the richer the AI insights.
      </p>
      <div className="w-full border border-gray-300 rounded-md flex flex-col gap-4">
        <textarea
          ref={textareaRef}
          className="w-full min-h-[100px] max-h-[300px] p-4 resize-none overflow-auto focus:outline-none focus:ring-0 focus:border-transparent rounded-md"
          placeholder="Add all your text here"
          onInput={handleInput}
        />
        <div className="flex justify-between items-center w-full px-3 pb-2">
          <button className="bg-[var(--brand-color)] text-white rounded-md px-3 py-2 flex gap-1 justify-center items-center cursor-pointer">
            <GoPlus />
            <p>Add file</p>
          </button>
          <button className="rounded-md px-3 py-2 bg-[var(--secondary-color)] text-white cursor-pointer">
            Calculate opportunity score
          </button>
        </div>
      </div>
    </div>
  );
}

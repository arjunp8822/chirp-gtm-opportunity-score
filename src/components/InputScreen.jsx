import { useState } from "react";
import TextArea from "./TextArea";
import FileUpload from "./FileUpload";
import Button from "./Button";

export default function InputScreen({ onSubmit, loading }) {
  const [inputText, setInputText] = useState("");
  const [uploadedText, setUploadedText] = useState("");

  const handleFileSelect = async (file) => {
    if (!file) {
      setUploadedText("");
      return;
    }

    try {
      let text = "";

      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.name.endsWith(".txt")) {
        text = await file.text();
      } else {
        // For other file types, you might want to add more sophisticated parsing
        text = `File: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(
          2
        )} MB\n\nPlease paste the content manually.`;
      }

      setUploadedText(text);
      setInputText(text);
    } catch (error) {
      console.error("Error reading file:", error);
      alert(
        "Error reading file. Please try again or paste the content manually."
      );
    }
  };

  const handleSubmit = () => {
    const combinedText = inputText.trim();
    if (combinedText.length < 10) {
      alert("Please provide at least 10 characters of deal data for analysis.");
      return;
    }
    onSubmit(combinedText);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto min-h-screen gap-6 px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-color)]">
          Boost your deal intelligence with{" "}
          <span className="text-[var(--secondary-color)]">Chirp AI</span>
        </h1>
        <p className="text-lg text-[var(--brand-color-50)] max-w-2xl">
          Paste your deal notes or upload your call transcripts, email threads,
          Slack chats, or WhatsApp conversations. The more context you provide,
          the richer the AI insights.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Data
              </label>
              <TextArea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your deal notes, call transcripts, email threads, or any relevant deal information here..."
                minHeight={120}
                maxHeight={400}
              />
            </div>

            <div className="text-center text-sm text-gray-500">— or —</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!inputText.trim() || loading}
              loading={loading}
              size="lg"
            >
              {loading ? "Analyzing..." : "Calculate Opportunity Score"}
            </Button>
          </div>
        </div>

        {inputText && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Ready to analyze:</strong> {inputText.length} characters
              of deal data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

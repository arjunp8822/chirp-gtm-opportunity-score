import { useState } from "react";
import Button from "./Button";

export default function EmailCapture({ onBack, onSubmit }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ email, name, company });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-2xl mx-auto min-h-screen gap-8 px-4 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-color)]">
          Get Detailed Recommendations
        </h1>
        <p className="text-lg text-[var(--brand-color-50)]">
          Receive personalized deal strategies and next steps tailored to your
          specific situation.
        </p>
      </div>

      <div className="w-full bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-transparent"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)] focus:border-transparent"
              placeholder="Your company"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              What you'll receive:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Detailed deal strategy recommendations</li>
              <li>• Risk mitigation strategies</li>
              <li>• Next steps and timeline suggestions</li>
              <li>• Stakeholder engagement tactics</li>
              <li>• Competitive positioning advice</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              Back to Results
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={!email.trim()}
              className="flex-1"
            >
              {loading ? "Sending..." : "Get Recommendations"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

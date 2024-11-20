"use client";

import React, { useEffect, useState } from "react";

export default function TextGenerator() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const generateText = () => {
    if (text && count > 0) {
      const repeatedText = Array.from(
        { length: count },
        (_, i) => `${i + 1}. ${text}`
      ).join("\n");
      setOutput(repeatedText);
    } else {
      showToast(
        "Please provide valid input and a number greater than 0.",
        "error"
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Text copied to clipboard successfully.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <h1 className="text-4xl font-bold text-white text-center mb-6 flex items-center justify-center">
          ✨ Text Generator
        </h1>

        <textarea
          className="w-full p-3 bg-white bg-opacity-50 border-none rounded-lg mb-4 focus:ring-2 focus:ring-purple-400 resize-none placeholder-gray-500 text-gray-800"
          rows={3}
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-3 bg-white bg-opacity-50 border-none rounded-lg mb-4 focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-gray-800"
          placeholder="Enter number of repetitions..."
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
        />

        <button
          onClick={generateText}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-1"
        >
          Generate Magic Text
        </button>

        {output && (
          <div className="mt-6 space-y-4">
            <textarea
              className="w-full p-3 bg-white bg-opacity-70 border-none rounded-lg text-gray-800"
              rows={6}
              value={output}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              }`}
            >
              {copied ? "✅ Copied!" : "📋 Copy Text"}
            </button>
          </div>
        )}

        {toast.show && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

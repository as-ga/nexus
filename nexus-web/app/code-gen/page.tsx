"use client";
import { Log as log } from "gaurav-logger";

import React, { useState, FC, useEffect } from "react";

const CopyIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const XCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const AlertCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const Spinner: FC = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// --- Main Page Component ---
export default function CodeManagementPage() {
  const [activeTab, setActiveTab] = useState<"generate" | "verify">("generate");

  // Generator State
  const [batchId, setBatchId] = useState<string>("");
  const [vendorCode, setVendorCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatorError, setGeneratorError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Verifier State
  const [codeToVerify, setCodeToVerify] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: "idle" | "Uniqe" | "Used" | "Booked" | "Error";
    details?: any;
  }>({ status: "idle" });
  const [verifierError, setVerifierError] = useState<string>("");
  const [uniqueCode, setUniqueCode] = useState<string>("");

  const handleGenerate = async (
    batchId: string,
    additionalData?: string
  ): Promise<boolean> => {
    setIsGenerating(true);
    setGeneratorError("");
    setUniqueCode("");
    const response = await fetch("/api/qrcode-unique-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batchId, additionalData }),
    });
    const data = await response.json();
    setUniqueCode(data.uniqueId);
    if (response.ok) {
      setIsGenerating(false);
      return true;
    }
    setGeneratorError(data.error || "Failed to save code. Please try again.");
    setIsGenerating(false);
    return false;
  };
  // Effect to clear results when switching tabs
  useEffect(() => {
    setGeneratorError("");
    setVerifierError("");
    setVerificationResult({ status: "idle" });
  }, [activeTab]);
  const handleCopyCode = () => {
    if (!uniqueCode) return;
    navigator.clipboard.writeText(uniqueCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleVerify = async () => {
    if (!codeToVerify.trim()) {
      setVerifierError("Please enter a code to verify.");
      return;
    }
    setIsVerifying(true);
    setVerifierError("");
    setVerificationResult({ status: "idle" });
    try {
      const response = await fetch(
        `/api/verify-qr-code?code=${encodeURIComponent(codeToVerify.trim())}`
      );
      // console.log(response)
      const data = await response.json();
      const statusText = response.statusText as
        | "Uniqe"
        | "Used"
        | "Booked"
        | "Error";
      // console.log(data);
      setVerificationResult({ status: statusText, details: data });
    } catch (error) {
      log.error(`Verification error: ${error}`);
      setVerifierError("Failed to verify code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const VerificationResultDisplay = () => {
    if (verificationResult.status === "idle") return null;

    const resultTypes = {
      Uniqe: {
        icon: <CheckCircleIcon className="w-8 h-8 text-green-500" />,
        bgColor: "bg-green-100 dark:bg-green-800/30",
        textColor: "text-green-800 dark:text-green-300",
        title: "Code is Available",
        message: "This code is valid and available for use.",
      },
      Booked: {
        icon: <AlertCircleIcon className="w-8 h-8 text-yellow-500" />,
        bgColor: "bg-yellow-100 dark:bg-yellow-800/30",
        textColor: "text-yellow-800 dark:text-yellow-300",
        title: "Code Already Booked",
        message:
          "This code is already present in the database But Not Printed Yet.",
      },
      Used: {
        icon: <XCircleIcon className="w-8 h-8 text-red-500" />,
        bgColor: "bg-red-100 dark:bg-red-800/30",
        textColor: "text-red-800 dark:text-red-300",
        title: "Code is Used",
        message: "This code is Already Used.",
      },
      Error: {
        icon: <XCircleIcon className="w-8 h-8 text-red-500" />,
        bgColor: "bg-red-100 dark:bg-red-800/30",
        textColor: "text-red-800 dark:text-red-300",
        title: "Verification Error",
        message:
          "An error occurred while verifying the code. Please try again.",
      },
    };

    const currentResult = resultTypes[verificationResult.status];
    const details = verificationResult.details;
    console.log(details);

    return (
      <div
        className={`mt-6 p-4 rounded-lg flex flex-col gap-3 transition-all duration-300 ${currentResult.bgColor}`}
      >
        <div className="flex items-center gap-3">
          {currentResult.icon}
          <div>
            <h3 className={`font-bold text-lg ${currentResult.textColor}`}>
              {currentResult.title}
            </h3>
            <p className={`text-sm ${currentResult.textColor}`}>
              {currentResult.message}
            </p>
          </div>
        </div>
        {details && (
          <div className="mt-2 pt-3 border-t border-slate-300/50 dark:border-slate-600/50 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>
              <strong>Batch ID:</strong> {details.batchId}
            </p>
            {details.additionalData && (
              <p>
                <strong>Additional Data:</strong> {details.additionalData}
              </p>
            )}
            <p>
              <strong>Created On:</strong>{" "}
              {new Date(details.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>
    );
  };

  const TabButton = ({
    tabName,
    label,
  }: {
    tabName: "generate" | "verify";
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-6 py-3 text-lg font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
        activeTab === tabName
          ? "bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 border-b-2 border-green-500"
          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4 mt-10 font-sans text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-bold">Unique Code System</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Generate and verify database-aware unique codes.
          </p>
        </header>

        <div className="border-b border-slate-300 dark:border-slate-700">
          <TabButton tabName="generate" label="Generate Code" />
          <TabButton tabName="verify" label="Verify Code" />
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-b-2xl shadow-xl">
          {activeTab === "generate" && (
            <div>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="batchId"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Component Batch ID (Compulsory)
                  </label>
                  <input
                    type="text"
                    id="batchId"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    placeholder="e.g., BATCH-FALL-2025"
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="additionalData"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Vendor Id (Optional)
                  </label>
                  <input
                    type="text"
                    id="additionalData"
                    value={vendorCode}
                    onChange={(e) => setVendorCode(e.target.value)}
                    placeholder="e.g., a customer name or product ID"
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              {generatorError && (
                <p className="text-sm text-red-500 mt-4">{generatorError}</p>
              )}
              <button
                onClick={() => handleGenerate(batchId, vendorCode)}
                disabled={isGenerating}
                className="mt-6 w-full flex items-center justify-center bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                {isGenerating ? <Spinner /> : "Generate & Save Code"}
              </button>
              {uniqueCode && (
                <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg animate-fade-in">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                        Successfully Generated & Saved:
                      </p>
                      <code className="text-xl font-mono text-green-600 dark:text-green-400 break-all">
                        {uniqueCode}
                      </code>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      title="Copy to clipboard"
                      className="p-2 text-slate-500 hover:text-green-600 dark:hover:text-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                      {copySuccess ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        <CopyIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "verify" && (
            <div>
              <div>
                <label
                  htmlFor="codeToVerify"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Unique Code
                </label>
                <input
                  type="text"
                  id="codeToVerify"
                  value={codeToVerify}
                  onChange={(e) => setCodeToVerify(e.target.value)}
                  placeholder="Enter the 16-character code to verify"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {verifierError && (
                <p className="text-sm text-red-500 mt-4">{verifierError}</p>
              )}
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="mt-6 w-full flex items-center justify-center bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-700 disabled:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition duration-150"
              >
                {isVerifying ? <Spinner /> : "Verify Code"}
              </button>
              <VerificationResultDisplay />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

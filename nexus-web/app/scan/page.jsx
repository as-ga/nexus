"use client";

import { useState } from "react";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {Log as log} from "gaurav-logger"

export default function App() {
  const [decodedResults, setDecodedResults] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);

  const onNewScanResult = async (decodedText, decodedResult) => {
    log.error("Scanned:", decodedText, decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
    setScanning(false);

    try {
      // Example API call (replace with your endpoint)
      const res = await fetch(`/api/check-code?code=${decodedText}`);
      if (!res.ok) throw new Error("Failed to fetch data from API");
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleScanAgain = () => {
    setDecodedResults([]);
    setApiResponse(null);
    setError(null);
    setScanning(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className=" shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-300">
          QR Code Scanner
        </h1>

        {scanning ? (
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </div>
        ) : (
          <>
            {apiResponse && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow mb-4">
                <h2 className="font-semibold">Result:</h2>
                <pre className="text-sm mt-2 text-left whitespace-pre-wrap">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow mb-4">
                <h2 className="font-semibold">Error:</h2>
                <p className="mt-1">{error}</p>
              </div>
            )}

            <button
              onClick={handleScanAgain}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Scan Again
            </button>
          </>
        )}

        <div className="mt-6 text-sm text-gray-600">
          {decodedResults.length > 0 && (
            <p>
              Last Scanned Code:{" "}
              <span className="font-medium">
                {decodedResults[decodedResults.length - 1].decodedText}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

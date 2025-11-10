"use client";

import { useState } from "react";
import { decodeJWT } from "@/lib/utils/jwt";

export default function DebugJWTPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<any>(null);

  const handleDecode = () => {
    if (!token) {
      alert("Please paste a JWT token");
      return;
    }
    const payload = decodeJWT(token);
    setDecoded(payload);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          JWT Token Decoder
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste JWT Token (from localStorage or Network tab):
            </label>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none font-mono text-sm"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </div>

          <button
            onClick={handleDecode}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold"
          >
            Decode Token
          </button>

          {decoded && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Decoded Payload:
              </h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                {JSON.stringify(decoded, null, 2)}
              </pre>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">
                  Available Fields:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  {Object.keys(decoded).map((key) => (
                    <li key={key}>
                      <span className="font-mono font-bold">{key}</span>:{" "}
                      {typeof decoded[key] === "object"
                        ? JSON.stringify(decoded[key])
                        : String(decoded[key])}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-yellow-900 mb-2">
              How to get your JWT token:
            </h3>
            <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
              <li>Login to your account</li>
              <li>Open Browser DevTools (F12)</li>
              <li>Go to "Console" tab</li>
              <li>Look for logs starting with "🔍 JWT Payload"</li>
              <li>
                OR go to "Application" tab → Local Storage → Copy the token
              </li>
              <li>Paste the token above and click "Decode Token"</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

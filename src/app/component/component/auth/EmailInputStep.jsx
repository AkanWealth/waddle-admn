"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function EmailInputStep({ email, setEmail, onSubmit, isLoading }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const btnDisabled = !isClient || email === "" || isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (btnDisabled) return;

    // Call the onSubmit callback passed from parent
    if (onSubmit) {
      await onSubmit(email);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Forgot Your Password?</h1>
        <p className="text-gray-600 mt-2">
          Enter your registered email, and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="designbytomi@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={btnDisabled}
          className={`w-full py-3 px-4 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ${
            btnDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Reset Email"
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { ToastContext, useToastContext } from "@/context/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <ToastContext>
      <Login />
    </ToastContext>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Add this line
  const router = useRouter();


  useEffect(() => {
    setIsClient(true);
  }, []);

  const btnDisabled = !isClient || email === "" || password === "" || isLoading;

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating login for demo purposes
    setTimeout(() => {
      showMessage("Login Successful", "Welcome back!", "success");
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
    
    // Your actual login logic would go here
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back! 👋</h1>
        <p className="text-gray-600 mt-2">
          Log in to manage your events, track bookings, and grow your business.
        </p>
      </div>

      <form onSubmit={login} className="space-y-6">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"} // <-- Toggle type
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)} // <-- Toggle state
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye-off icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-6.364A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-6.364-2.364M3 3l18 18" />
                </svg>
              ) : (
                // Eye icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm  hover:text-blue-800">
            Forgot Password? <span className="text-blue-600 font-medium">Reset here</span>
          </Link>
        </div>

        <button
          type="submit"
          disabled={btnDisabled}
          className={`w-full py-3 px-4 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            btnDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      {/* <div className="mt-6 text-center">
        <p className="text-gray-600">
          New to the platform?{" "}
          <Link href="/SignUp" className="text-blue-600 font-medium hover:text-blue-800">
            Sign Up
          </Link>
        </p>
      </div> */}
    </div>
  );
}
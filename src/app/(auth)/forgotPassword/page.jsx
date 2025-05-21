"use client";
import React, { useState, useEffect } from "react";
import { ToastContext, useToastContext } from "@/context/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <ToastContext>
      <ForgotPassword />
    </ToastContext>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();
  const [isClient, setIsClient] = useState(false);
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
        <h1 className="text-3xl font-bold text-gray-800">Forgot Your Password</h1>
        <p className="text-gray-600 mt-2">
          Enter your registered email, and we'll send you a link to reset your password.
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
              Sending...
            </span>
          ) : (
            "Send Reset Email"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remebered Password?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { ToastContext, useToastContext } from "@/context/toast";
import { AuthProvider, useAuth } from "@/context/AuthContext"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <AuthProvider>
      <ToastContext>
        <Login />
      </ToastContext>
    </AuthProvider>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Check if user is already logged in
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const btnDisabled = !isClient || email === "" || password === "" || isLoading;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authLogin(email, password);
      
      if (result.success) {
        showMessage("Login Successful", "Welcome back!", "success");
        router.push("/dashboard");
      } else {
        showMessage("Login Failed", result.error || "Invalid credentials", "error");
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage("Login Failed", "Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Welcome Back, Waddle Admin! 👋</h1>
        <p className=" mt-2 text-black">
          Log in to manage your events, track bookings, and grow your business.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-black text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full !text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-6.364A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-6.364-2.364M3 3l18 18" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link href="/forgotPassword" className="text-sm text-black hover:text-blue-800">
            Forgot Password? <span className="text-[#2853A6] font-medium">Reset here</span>
          </Link>
        </div>

        <button
          type="submit"
          disabled={btnDisabled}
          className={`w-full py-3 px-4 rounded-lg bg-[#2853A6] text-white font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            btnDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
    </div>
  );
}
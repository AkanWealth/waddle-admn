"use client";
import React from "react";
import Link from "next/link";

export default function EmailVerificationStep({ email, onResendLink, onBackToEmail, isLoading }) {
  const handleCheckEmail = () => {
    // Open email client or redirect to email
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <div className="w-full text-center">
      <div className="mb-8">
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h2> */}
        
        <div className="flex justify-center mb-6">
          <div className="w-full rounded-full flex items-center justify-center">
            <img src="/email.png" alt="EmailLogo" className="w-auto h-auto"></img>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          A password reset link has been sent to{" "}
          <span className="text-orange-500 font-medium">{email}</span>.
          
          Check your inbox and follow the instructions to reset your password.
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleCheckEmail}
          className="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Check Email
        </button>
        
        <p className="text-gray-600">
          Didn't receive the email?{" "}
          <button 
            onClick={onResendLink} 
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-800 font-medium underline disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Resend Link"}
          </button>
        </p>

        {/* <button
          onClick={onBackToEmail}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back to email input
        </button> */}
      </div>

      {/* <div className="mt-8 text-center">
        <p className="text-gray-600">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
            Login
          </Link>
        </p>
      </div> */}
    </div>
  );
}
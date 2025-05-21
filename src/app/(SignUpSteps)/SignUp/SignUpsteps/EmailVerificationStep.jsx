
"use client";
import React from 'react';
import Link from 'next/link';

// Step 2: Email Verification
export function EmailVerificationStep({ email = "email@example.com", onCheckEmail, onResendLink }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Verify Your Email Address</h2>
      
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8">
        We've sent a confirmation link to <span className="text-orange-500 font-medium">{email}</span>. Please check your inbox to verify your account.
      </p>
      
      <button
        onClick={onCheckEmail}
        className="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-200 transition duration-300 mb-4"
      >
        Check Email
      </button>
      
      <p className="text-gray-600">
        Didn't receive the email? <button onClick={onResendLink} className="text-blue-600 hover:underline">Resend Link</button>
      </p>
    </div>
  );
}

export default EmailVerificationStep;
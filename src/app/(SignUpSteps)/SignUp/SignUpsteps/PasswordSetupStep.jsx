"use client";
import React from 'react';
import Link from 'next/link';


// Step 3: Password Setup
export function PasswordSetupStep({ onSubmit }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Set Up Your Password</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Re-enter Password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-200 transition duration-300"
        >
          Set Password
        </button>
      </form>
    </div>
  );
}
 export default PasswordSetupStep;
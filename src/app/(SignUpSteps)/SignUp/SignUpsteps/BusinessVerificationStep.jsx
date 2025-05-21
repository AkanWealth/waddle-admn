"use client";
import React from 'react';
import Link from 'next/link';


// Step 4: Business Verification
export function BusinessVerificationStep({ onSubmit }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verify Your Business</h2>
      <p className="text-gray-600 mb-6">To activate your account, please upload the required documents for verification.</p>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unique Taxpayer Reference (UTR) <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="Enter your tax identification number" 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business License <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-gray-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Drag and drop your file</p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
            <button
              type="button"
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Choose Files
            </button>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-200 transition duration-300"
        >
          Submit for Verification
        </button>
      </form>
    </div>
  );
}
export default BusinessVerificationStep;
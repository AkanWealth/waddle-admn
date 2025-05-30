"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="h-screen flex">
     

      {/* Right side with success message */}
      <div className="w-full  flex items-center justify-center p-8">
        <div className="w-full  text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Success</h1>
          
          {/* Success icon */}
          <div className="w-full mb-8 flex justify-center">
            <img src="/SuccessLogo.png" alt="Success Icon" className="w-auto h-auto mb-4" />
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            Your password has been set! You can now log in.
          </p>

          <button
            onClick={handleLoginClick}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';
import { ToastContext, useToastContext } from "@/context/toast";
// import { toast } from 'react-toastify';
import { resetPassword } from '@/utils/passwordresetApi';

export default function PasswordSetupForm() {

   const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const { showMessage } = useToastContext();
  

  // Password validation checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMinLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password !== '';



  const isFormValid = hasLowercase && hasUppercase && hasNumber && hasSpecialChar && isMinLength && passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    if (!isFormValid) {
      toast.error('Please ensure all password requirements are met');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(token, password);

      if (result.success) {
        showMessage("Password changed successfully", "Your password has been changed successfully", "success");
        // Redirect to login page after successful reset
        setTimeout(() => {
          router.push('/success');
        }, 2000);
      } else {
        showMessage("Invalid email or password.", "Please try again", "error");

      }
    } catch (error) {
      showMessage("Invalid email or password.", "Please try again", "error");

      // toast.error('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
         <div className="min-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
   
     
      {/* Right side with form */}
      <div className="w-full h-full overflow-auto">
        <div className="w-full h-full flex items-center justify-left p-2">
          <div className="w-full max-w-xl">
            

            <div className="space-y-6">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Let’s Secure Your Account
                </h1>
                <p className='text-sm text-gray-500 mb-2'>Before you continue, please set a new password to secure your account.</p>
              </div>

              <div className="space-y-6">
                {/* New Password Field */}
                <div>
                  <div className="block text-sm font-bold text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-1 gap-2 text-xs">
                    <div className={`flex items-center space-x-2 ${hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasLowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>One Uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>One special character</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 col-span-2 ${isMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${isMinLength ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>8 characters minimum</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <div className="block text-sm font-bold text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!(hasLowercase && hasUppercase && hasNumber && hasSpecialChar && isMinLength && passwordsMatch)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Set Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
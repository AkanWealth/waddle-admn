"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';
import { ToastContext, useToastContext } from "@/context/toast";
// import { toast } from 'react-toastify';
import { verifyAdminEmail } from '@/utils/passwordresetApi';

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
      showMessage("Invalid or missing reset token", "Please check your reset link", "error");
      return;
    }

    if (!isFormValid) {
      showMessage("Error", "Your password must meet all requirements", "error");
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
                <h1 className="text-2xl font-bold text-[#303237] mb-2">
                  Let’s Secure Your Account
                </h1>
                <p className='text-sm text-[#565C69] mb-2'>Before you continue, please set a new password to secure your account.</p>
              </div>

              <div className="space-y-6">
                {/* New Password Field */}
                <div>
                  <div className="block text-sm font-bold text-[#303237] mb-2">
                    New Password <span className="text-red-500">*</span>
                  </div>
                  <div className="relative ">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border text-[#303237] border-[#BDC0CE] rounded-lg focus:ring-2 focus:ring-[#2853A6] focus:border-transparent outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#303237] "
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-1 gap-2 text-xs">
                    <div className={`flex items-center space-x-2 ${hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasLowercase ? 'bg-[#1E9A64]' : 'bg-[#BDC0CE]'}`}></div>
                      <span className='text-[#303237]'>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasUppercase ?'text-[#1E9A64]' : 'text-[#BDC0CE]'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasUppercase ? 'bg-[#1E9A64]' : 'bg-[#BDC0CE]'}`}></div>
                      <span className='text-[#303237]'>One Uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasSpecialChar ? 'text-[#1E9A64]' : 'text-[#BDC0CE]'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasSpecialChar ? 'bg-[#1E9A64]' : 'bg-[#BDC0CE]'}`}></div>
                      <span className='text-[#303237]'>One special character</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${hasNumber ? 'text-[#1E9A64]' : 'text-[#BDC0CE]'}`}>
                      <div className={`w-2 h-2 rounded-full ${hasNumber ? 'bg-[#1E9A64]' : 'bg-[#BDC0CE]'}`}></div>
                      <span className='text-[#303237]'>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 col-span-2 ${isMinLength ? 'text-[#1E9A64]' : 'text-[#BDC0CE]  '}`}>
                      <div className={`w-2 h-2 rounded-full ${isMinLength ? 'bg-[#1E9A64]' : 'bg-[#BDC0CE]'}`}></div>
                      <span className='text-[#303237]'>8 characters minimum</span>
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
                      className="w-full px-4 py-3 border border-[#BDC0CE] text-[#303237] rounded-lg focus:ring-2 focus:ring-[#2853A6] focus:border-transparent outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#303237] "
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!(hasLowercase && hasUppercase && hasNumber && hasSpecialChar && isMinLength && passwordsMatch)}
                  className="w-full bg-[#2853A6] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
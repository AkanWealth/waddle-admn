"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../layout';
import SignUpStep from './SignUpsteps/SignUpStep';
import EmailVerificationStep from './SignUpsteps/EmailVerificationStep';
import PasswordSetupStep from './SignUpsteps/PasswordSetupStep';
import BusinessVerificationStep from './SignUpsteps/BusinessVerificationStep';


export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    businessCategory: '',
    businessEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    utr: '',
    businessLicense: null
  });
  
  const router = useRouter();
  
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, businessLicense: file }));
  };
  
  // Handle step submission
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    // Validate form and save data
    // For this example, we'll just move to the next step
    setCurrentStep(2);
  };
  
  const handleEmailVerification = () => {
    // In a real app, you would verify if the user clicked the link
    setCurrentStep(3);
  };
  
  const handleResendLink = () => {
    // Logic to resend verification email
    alert('Verification link resent!');
  };
  
  const handleSubmitStep3 = (e) => {
    e.preventDefault();
    // Validate password strength and matching
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setCurrentStep(4);
  };
  
  const handleSubmitStep4 = (e) => {
    e.preventDefault();
    // Submit all form data to your API
    console.log('Submitting all data:', formData);
    // Redirect to dashboard after successful registration
    router.push('/dashboard');
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <SignUpStep 
            onSubmit={handleSubmitStep1} 
            formData={formData} 
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <EmailVerificationStep 
            email={formData.businessEmail || formData.email || 'email@example.com'} 
            onCheckEmail={handleEmailVerification} 
            onResendLink={handleResendLink} 
          />
        );
      case 3:
        return (
          <PasswordSetupStep 
            onSubmit={handleSubmitStep3} 
            formData={formData} 
            onChange={handleChange} 
          />
        );
      case 4:
        return (
          <BusinessVerificationStep 
            onSubmit={handleSubmitStep4} 
            formData={formData} 
            onChange={handleChange}
            onFileChange={handleFileChange}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    // <AuthLayout currentStep={currentStep}>
    <div>
      {renderStepContent()}
      </div>
    // </AuthLayout>
  );
}
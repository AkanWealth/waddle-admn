import React from 'react';
import Link from 'next/link';

const SignUpStep = ({ onSubmit, formData, onChange }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Your Event Provider Account</h1>
      <p className="text-gray-600 mb-6">Join our Waddle and start hosting events. Enter your details to begin.</p>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* First Name */}
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              required
              placeholder="Enter your first name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Last Name */}
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              required
              placeholder="Enter your last name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={onChange}
            required
            placeholder="Enter your business name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Business Category */}
        <div>
          <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Business Category <span className="text-red-500">*</span>
          </label>
          <select
            id="businessCategory"
            name="businessCategory"
            value={formData.businessCategory}
            onChange={onChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="" disabled>Select business category</option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food & Catering</option>
            <option value="venue">Venue</option>
            <option value="decoration">Decoration</option>
            <option value="photography">Photography</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* Business Email */}
        <div>
          <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={onChange}
            required
            placeholder="event@company.com"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            required
            placeholder="+44 488883993"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Terms and Conditions */}
        <div className="mt-4 text-sm text-gray-600">
          By creating account, you agree to the Waddle's{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>{' '}
          &{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-700 text-white hover:bg-blue-200 transition-colors rounded mt-4"
        >
          Create Account
        </button>
        
        {/* Login Link */}
        <div className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpStep;
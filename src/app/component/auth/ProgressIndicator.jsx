import React from "react";

export default function ProgressIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          const isLast = stepNumber === totalSteps;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNumber}
              </div>
              {!isLast && (
                <div className={`w-8 h-1 ${currentStep > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
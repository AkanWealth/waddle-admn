import React, { Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Image from "next/image";
import "../globals.css";

function AuthLayout({ children}) {
  const currentStep = 1;
  const steps = [
    { number: 1, label: "Sign up" },
    { number: 2, label: "Email" },
    { number: 3, label: "Password Setup" },
    { number: 4, label: "Business Verification" }
  ];

  return (
    <Suspense>
      <main className="fixed w-full h-screen flex font-rubikRegular">
        {/* Left side with banner image and text */}
        <div className="hidden md:flex md:w-1/2 h-full flex-col relative bg-[#F9F1EE] p-16">
          {/* Logo at the top */}
          <div className="mb-16">
            <Image
              src="/WADDLE4.png"
              alt="Waddle Logo"
              width={120}
              height={40}
              className="w-auto"
            />
          </div>
          
          {/* Headline text */}
          <div className="mb-8">
            <h1 className="lg:text-4xl md:text-xl font-bold text-gray-800">
              Host & <span className="text-blue-600">Manage</span>
            </h1>
            <h1 className="lg:text-4xl md:text-xl font-bold text-gray-800">
              Events with Ease!
            </h1>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-[140px] right-[80px]">
            <Image
              src="/Star 2.png"
              alt="Star decoration"
              width={25}
              height={25}
              className="w-auto"
            />
          </div>

          <div className="absolute top-[380px] left-[110px]">
            <Image
              src="/Star 2.png"
              alt="Star decoration"
              width={40}
              height={40}
              className="w-auto opacity-70"
            />
          </div>

          <div className="absolute top-[250px] right-[120px] opacity-80">
            <Image
              src="/Ellipse 159.png"
              alt="Circle decoration"
              width={60}
              height={60}
              className="w-auto"
            />
          </div>
          
          {/* Main illustration positioned at the bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <Image 
              src="/signup.png"
              alt="Login illustration"
              width={500}
              height={200}
              priority
              className="w-full md:w-auto"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3 h-full overflow-auto">
          <div className="w-full h-full flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
              {/* Logo for mobile view - shown only on mobile */}
              <div className="flex justify-center mb-8 md:hidden">
                <Image
                  src="/WADDLE4.png"
                  alt="Waddle Logo"
                  width={100}
                  height={40}
                  className="w-auto"
                />
              </div>

              {/* Step indicator - Horizontal with chevron arrows like in the design */}
              <div className="flex items-center justify-between mb-8 px-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    {/* Step item */}
                    <div className="flex items-center">
                      <span className={`text-sm ${
                        currentStep === step.number 
                          ? "text-black font-medium" 
                          : currentStep > step.number 
                            ? "text-blue-600 font-medium" 
                            : "text-gray-400"
                      }`}>
                        {step.number}. {step.label}
                      </span>
                    </div>

                    {/* Chevron separator between steps */}
                    {index < steps.length - 1 && (
                      <div className="mx-2">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${
                            currentStep > index + 1 || currentStep === index + 1
                              ? "text-blue-600" 
                              : "text-gray-300"
                          }`}
                        >
                          <path 
                            d="M9 18L15 12L9 6" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {children}
            </div>
          </div>
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
    </Suspense>
  );
}

export default AuthLayout;
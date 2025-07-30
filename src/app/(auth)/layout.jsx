import React, { Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Image from "next/image";
import "../globals.css";

function AuthLayout({ children }) {
  return (
    <Suspense>
      <main className="fixed w-full h-screen !bg-white flex font-rubikRegular">
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
          {/* <div className="mb-8">
            <h1 className="lg:text-4xl md:text-xl font-bold text-gray-800">
              Manage <span className="text-blue-600">Bookings</span>
            </h1>
            <h1 className="lg:text-4xl md:text-xl  font-bold text-gray-800">
              & Track Payments
            </h1>
          </div> */}
          
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
          <div className="absolute  right-16 bottom-0 left-16 w-full">
            <Image 
              src="/login_layout.png"
              alt="Login illustration"
              width={400}
              height={400}
              priority
              className="w-full h-[500px] md:w-auto"
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
// "use client";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useToastContext } from "@/context/toast";
// import { forgotPassword } from "@/utils/passwordresetApi";
// import EmailInputStep from "./EmailInputStep";
// import EmailVerificationStep from "./EmailVerificationStep";
// import ProgressIndicator from "./ProgressIndicator";

// export default function ForgotPasswordFlow() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { showMessage } = useToastContext();
  

//   const handleEmailSubmit = async (emailValue) => {
//     setIsLoading(true);
    
//     try {
//       const result = await forgotPassword(emailValue);

//       if (result.success) {
//         showMessage("Reset email sent successfully!", "Check your email for the link", "success");

//         // toast.success(result.message || "Reset email sent successfully!");
//         setEmail(emailValue);
//         setCurrentStep(2); // Move to email verification step
//       } else {
//         showMessage("Failed to send reset email", "try again", "error");

//         // toast.error(result.error || "Failed to send reset email");
//       }
//     } catch (error) {
//         showMessage("An unexpected error occurred", "try again", "error");
      
//       // toast.error("An unexpected error occurred");
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setIsLoading(true);
    
//     try {
//       const result = await forgotPassword(email);

//       if (result.success) {
//         toast.success("Reset email sent again successfully!");
//       } else {
//         toast.error(result.error || "Failed to resend reset email");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBackToEmail = () => {
//     setCurrentStep(1);
//     setEmail("");
//   };

//   return (
//     <div className="w-full">
//       {/* <ProgressIndicator currentStep={currentStep} totalSteps={2} /> */}
      
//       {currentStep === 1 && (
//         <EmailInputStep
//           email={email}
//           setEmail={setEmail}
//           onSubmit={handleEmailSubmit}
//           isLoading={isLoading}
//         />
//       )}
      
//       {currentStep === 2 && (
//         <EmailVerificationStep
//           email={email}
//           onResendLink={handleResendLink}
//           onBackToEmail={handleBackToEmail}
//           isLoading={isLoading}
//         />
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { useToastContext } from "@/context/toast";
import { forgotPassword } from "@/utils/passwordresetApi";
import EmailInputStep from "./EmailInputStep";
import EmailVerificationStep from "./EmailVerificationStep";
import ProgressIndicator from "./ProgressIndicator";

export default function ForgotPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();
  

  const handleEmailSubmit = async (emailValue) => {
    setIsLoading(true);
    
    try {
      const result = await forgotPassword(emailValue);

      if (result.success) {
        showMessage("Reset email sent successfully!", "Check your email for the link", "success");
        setEmail(emailValue);
        setCurrentStep(2); // Move to email verification step
      } else {
        showMessage("Failed to send reset email", "try again", "error");
      }
    } catch (error) {
        showMessage("An unexpected error occurred", "try again", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    setIsLoading(true);
    
    try {
      const result = await forgotPassword(email);

      if (result.success) {
        showMessage("Reset email sent again successfully!", "Check your email for the link", "success");
      } else {
        showMessage("Failed to resend reset email", result.error || "Please try again", "error");
      }
    } catch (error) {
      showMessage("An unexpected error occurred", "Please try again", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setCurrentStep(1);
    setEmail("");
  };

  return (
    <div className="w-full">
      {/* <ProgressIndicator currentStep={currentStep} totalSteps={2} /> */}
      
      {currentStep === 1 && (
        <EmailInputStep
          email={email}
          setEmail={setEmail}
          onSubmit={handleEmailSubmit}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 2 && (
        <EmailVerificationStep
          email={email}
          onResendLink={handleResendLink}
          onBackToEmail={handleBackToEmail}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
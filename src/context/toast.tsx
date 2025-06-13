"use client";

import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS
import { createContext, useContext, ReactNode } from "react";
import { AlertCircle, X, CheckSquare } from "lucide-react";

interface MessageContextType {
  showMessage: (message: string, description?: string, status?: "success" | "error" | "default") => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface ToastContextProps {
  children: ReactNode;
}

export function ToastContext({ children }: ToastContextProps) {
  const showMessage = (message: string, description?: string, status: "success" | "error" | "default" = "default") => {
    const ToastContent = () => (
      <div className="flex items-start relative pl-6">
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
            {status === "success" && (
              <CheckSquare className="w-5 h-5 text-green-500" />
            )}
            {status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
            {status === "default" && <AlertCircle className="w-5 h-5 text-gray-500" />}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 ml-2">
          <h4 className="font-medium text-gray-900">{message}</h4>
          {description && (
            <p className="text-xs text-gray-600">{description}</p>
          )}
        </div>
      </div>
    );

    // Define background styles based on status
    const getBgColor = () => {
      switch (status) {
        case "success":
          return {
            backgroundColor: "#EAF6EC",
            borderLeft: "4px solid #22C55E",
            padding: "16px 16px 16px 24px",
          };
        case "error":
          return {
            backgroundColor: "#FEE2E2",
            borderLeft: "4px solid #EF4444",
            padding: "16px 16px 16px 24px",
          };
        default:
          return {
            backgroundColor: "#F3F4F6",
            borderLeft: "4px solid #6B7280",
            padding: "16px 16px 16px 24px",
          };
      }
    };

    const toastOptions = {
      position: "top-right" as const,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      closeButton: ({ closeToast }: { closeToast: () => void }) => (
        <button onClick={closeToast} className="p-1">
          <X size={16} className="text-gray-500" />
        </button>
      ),
      className:
        "rounded-md shadow-lg w-96 border-gray-100 overflow-visible",
      bodyClassName: "p-0",
      style: getBgColor(),
    };

    reactToast(<ToastContent />, toastOptions);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      <ToastContainer />
      {children}
    </MessageContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastContext provider');
  }
  return context;
}

// This function is redundant as it does the same thing as useToastContext
// Consider removing one of them to avoid confusion
export function useMessageContext() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageContext must be used within a ToastContext provider');
  }
  return context;
}
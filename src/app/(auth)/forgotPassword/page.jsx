"use client";
import React from "react";
import ForgotPasswordFlow from "../../component/auth/ForgotPasswordFlow";
import { ToastContext } from "@/context/toast";

export default function ForgotPasswordPage() {
  return (
    <ToastContext>
      <div className="min-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          
          
          <ForgotPasswordFlow />
        </div>
      </div>
    </ToastContext>
  );
}
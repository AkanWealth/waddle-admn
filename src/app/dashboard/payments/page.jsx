"use client";
import React from "react";
import Payment from "../../component/PaymentManagement/payment";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute 
      module="payment"
      redirectTo="/dashboard"
      fallback={null}
    >
      <Payment />
    </ProtectedRoute>
  );
}
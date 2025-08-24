"use client";
import React from "react";
import Dashboard from "../../component/Dashboard/dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute module="analytics">
      <Dashboard />
    </ProtectedRoute>
  );
}
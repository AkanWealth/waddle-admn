"use client";
import React from "react";
import EventManagement from "../../component/EventManagement/Event";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContext } from "@/context/toast";

export default function Page() {
  return (
    <ProtectedRoute module="eventManagement">
      <ToastContext>
      <EventManagement />
    </ToastContext>
    </ProtectedRoute>
  );
}
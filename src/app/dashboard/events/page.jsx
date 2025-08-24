"use client";
import React from "react";
import EventManagement from "../../component/EventManagement/Event";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute module="eventManagement">
      <EventManagement />
    </ProtectedRoute>
  );
}
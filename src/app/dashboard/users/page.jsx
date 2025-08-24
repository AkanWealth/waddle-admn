import React, { Suspense } from "react";
import UserManagementClient from "./UserManagementClient";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute module="userManagement">
      <Suspense fallback={<div></div>}>
        <UserManagementClient />
      </Suspense>
    </ProtectedRoute>
  );
}


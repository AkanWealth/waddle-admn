import React, { Suspense } from "react";
import UserManagementClient from "./UserManagementClient";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContext } from "@/context/toast";

export default function Page() {
  return (
    <ProtectedRoute module="userManagement">
      <Suspense fallback={<div></div>}>
          <ToastContext>
          <UserManagementClient />
        </ToastContext>
      </Suspense>
    </ProtectedRoute>
  );
}


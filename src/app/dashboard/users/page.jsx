import React, { Suspense } from "react";
import UserManagementClient from "./UserManagementClient";


export default function Page() {
  return (
     <Suspense fallback={<div></div>}>
       <UserManagementClient />
     </Suspense>

  );
}


"use client";
import React from "react";
import DeleteAccountClient from "./DeleteAccountClient";
import { Suspense } from "react";

const DeleteAccountPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DeleteAccountClient />
    </Suspense>
  );
};

export default DeleteAccountPage;

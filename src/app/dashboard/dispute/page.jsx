"use client";
import React from "react";
// import EventManagement from "../../component/EventManagement/Event";
import Dispute from "../../component/Dispute/dispute";
import { ToastContext } from "@/context/toast";


export default function Page() {
  return (
    <ToastContext>
      <Dispute />
    </ToastContext>
  );
}
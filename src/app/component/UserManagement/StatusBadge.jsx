"use client";

import { CircleCheck, CircleXIcon, Clock, TriangleAlert } from "lucide-react";

export default function StatusBadge({ status }) {
  switch (status) {
    case "APPROVED":
    case "Approved":
      return (
        <div className="flex items-center bg-green-100 rounded-lg px-2">
          <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-600 text-xs px-3 py-2">Approved</span>
        </div>
      );
    case "REJECTED":
    case "Rejected":
      return (
        <div className="flex items-center bg-red-100 rounded-lg px-2">
          <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-red-600 text-xs px-3 py-2">Rejected</span>
        </div>
      );
    case "ACTIVE":
    case "Active":
      return (
        <div className="flex items-center bg-green-100 rounded-lg px-2">
          <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-600 text-xs px-3 py-2">Active</span>
        </div>
      );
    case "Registered":
      return (
        <div className="flex items-center bg-green-100 rounded-lg px-2">
          <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-600 text-xs px-3 py-2">Registered</span>
        </div>
      );
    case "PENDING":
    case "Pending":
      return (
        <div className="flex items-center bg-gray-100 rounded-lg px-2">
          <Clock className="w-4 h-4 text-gray-500 mr-1" />
          <span className="text-gray-600 text-xs px-3 py-2">Pending</span>
        </div>
      );
    case "Inactive":
    case "INACTIVE":
      return (
        <div className="flex items-center bg-red-100 rounded-lg px-2">
          <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-red-600 text-xs px-3 py-2">Inactive</span>
        </div>
      );
    case "Spam":
      return (
        <div className="flex items-center bg-orange-100 rounded-lg px-2">
          <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
          <span className="text-orange-600 text-xs px-3 py-2">Spam</span>
        </div>
      );
    case "SUSPENDED":
    case "Suspended":
      return (
        <div className="flex items-center bg-orange-100 rounded-lg px-2">
          <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
          <span className="text-orange-600 text-xs px-3 py-2">Suspended</span>
        </div>
      );
    case "Deactivated":
      return (
        <div className="flex items-center bg-orange-100 rounded-lg px-2">
          <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
          <span className="text-orange-600 text-xs px-3 py-2">Deactivated</span>
        </div>
      );
    default:
      return null;
  }
}

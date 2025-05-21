"use client";

import { CircleCheck, CircleXIcon, Clock, TriangleAlert } from "lucide-react";

export default function StatusBadge({ status }) {
    switch (status) {
        case "Approved":
            return (
                <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Approved</span>
                </div>
            );
        case "Rejected":
            return (
                <div className="flex items-center bg-red-100 rounded-lg px-2">
                    <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-600 text-xs px-3 py-2">Rejected</span>
                </div>
            );
        case "Pending":
            return (
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600 text-xs px-3 py-2">Pending</span>
                </div>
            );
        case "Inactive":
            return (
                <div className="flex items-center bg-orange-100 rounded-lg px-2">
                    <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-orange-600 text-xs px-3 py-2">Inactive</span>
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
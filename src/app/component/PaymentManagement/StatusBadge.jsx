"use client";

import { CircleCheck, CircleX, CircleXIcon, Clock, TriangleAlert } from "lucide-react";

export default function StatusBadge({ status }) {
    // Normalize status to handle both cases
    const normalizedStatus = status?.toLowerCase();
    
    switch (normalizedStatus) {
        case "successful":
            return (
                <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Successful</span>
                </div>
            );
        case "failed":
            return (
                <div className="flex items-center bg-red-100 rounded-lg px-2">
                    <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-600 text-xs px-3 py-2">Failed</span>
                </div>
            );
        case "active":
            return (
                 <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Active</span>
                </div>
            );
        case "registered":
            return (
                 <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Registered</span>
                </div>
            );
        case "pending":
            return (
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600 text-xs px-3 py-2">Pending</span>
                </div>
            );
        case "refunded":
            return (
                <div className="flex items-center bg-yellow-100 rounded-lg px-2">
                    <TriangleAlert className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-yellow-600 text-xs px-3 py-2">Refunded</span>
                </div>
            );
        case "cancelled":
            return (
                <div className="flex items-center bg-red-100 rounded-lg px-2">
                    <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-600 text-xs px-3 py-2">Cancelled</span>
                </div>
            );
        case "confirmed":
            return (
                <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Confirmed</span>
                </div>
            );
        case "spam":
            return (
                <div className="flex items-center bg-orange-100 rounded-lg px-2">
                    <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-orange-600 text-xs px-3 py-2">Spam</span>
                </div>
            );
        case "deactivated":
            return (
                <div className="flex items-center bg-orange-100 rounded-lg px-2">
                    <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-orange-600 text-xs px-3 py-2">Deactivated</span>
                </div>
            );
        case "no booking":
            return (
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <CircleX className="w-4 h-4 text-gray-500 mr-1"/>
                    <span className="text-gray-600 text-xs px-3 py-2">No Booking</span>
                </div>
            );
        default:
            return (
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <span className="text-gray-600 text-xs px-3 py-2">{status || 'Unknown'}</span>
                </div>
            );
    }
}
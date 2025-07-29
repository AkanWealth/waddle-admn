"use client";

import { CircleCheck, CircleXIcon, Clock, TriangleAlert, TrendingUpDown } from "lucide-react";

export default function StatusBadge({ status }) {
    switch (status) {
        case "Approved":
            return (
                <div className="flex items-center bg-green-100 rounded-lg px-2">
                    <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-xs px-3 py-2">Approved</span>
                </div>
            );
        case "Non-compliant":
            return (
                <div className="flex items-center bg-red-100 rounded-lg px-2">
                    <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-600 text-xs px-3 py-2">Non-compliant</span>
                </div>
            );
        case "Pending":
            return (
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600 text-xs px-3 py-2">Pending</span>
                </div>
            );
        case "Draft":
            return (
                <div className="flex items-center bg-orange-100 rounded-lg px-2">
                    <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-orange-600 text-xs px-3 py-2">Draft</span>
                </div>
            );
        case "Crowd sourced":
            return (
                <div className="flex items-center bg-blue-100 rounded-lg px-2">
                    <TrendingUpDown className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-blue-600 text-xs px-3 py-2">Crowd sourced</span>
                </div>
            );
        default:
            return null;
    }
}
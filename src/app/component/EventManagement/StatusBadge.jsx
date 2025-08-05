// // "use client";

// // import { CircleCheck, CircleXIcon, Clock, TriangleAlert, TrendingUpDown } from "lucide-react";

// // export default function StatusBadge({ status }) {
// //     switch (status) {
// //         case "Published":
// //             return (
// //                 <div className="flex items-center bg-green-100 rounded-lg px-2">
// //                     <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
// //                     <span className="text-green-600 text-xs px-3 py-2">Approved</span>
// //                 </div>
// //             );
// //         case "Non-compliant":
// //             return (
// //                 <div className="flex items-center bg-red-100 rounded-lg px-2">
// //                     <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />
// //                     <span className="text-red-600 text-xs px-3 py-2">Non-compliant</span>
// //                 </div>
// //             );
// //         case "Pending":
// //             return (
// //                 <div className="flex items-center bg-gray-100 rounded-lg px-2">
// //                     <Clock className="w-4 h-4 text-gray-500 mr-1" />
// //                     <span className="text-gray-600 text-xs px-3 py-2">Pending</span>
// //                 </div>
// //             );
// //         case "Draft":
// //             return (
// //                 <div className="flex items-center bg-orange-100 rounded-lg px-2">
// //                     <TriangleAlert className="w-4 h-4 text-orange-500 mr-1" />
// //                     <span className="text-orange-600 text-xs px-3 py-2">Draft</span>
// //                 </div>
// //             );
// //         case "Crowd sourced":
// //             return (
// //                 <div className="flex items-center bg-blue-100 rounded-lg px-2">
// //                     <TrendingUpDown className="w-4 h-4 text-blue-500 mr-1" />
// //                     <span className="text-blue-600 text-xs px-3 py-2">Crowd sourced</span>
// //                 </div>
// //             );
// //         default:
// //             return null;
// //     }
// // }


// import React from 'react';

// /**
//  * StatusBadge Component
//  * 
//  * Displays a colored badge based on the event status
//  * Now supports all backend EventStatus enum values
//  * 
//  * @param {Object} props
//  * @param {string} props.status - The status of the event
//  * @param {string} props.className - Additional CSS classes
//  */
// const StatusBadge = ({ status, className = "" }) => {
//     // Function to get badge styling based on status
//     const getBadgeStyle = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//             case 'published':
//                 return {
//                     bgColor: 'bg-green-100',
//                     textColor: 'text-green-800',
//                     borderColor: 'border-green-200'
//                 };
//             case 'draft':
//                 return {
//                     bgColor: 'bg-gray-100',
//                     textColor: 'text-gray-800',
//                     borderColor: 'border-gray-200'
//                 };
//             case 'pending':
//                 return {
//                     bgColor: 'bg-yellow-100',
//                     textColor: 'text-yellow-800',
//                     borderColor: 'border-yellow-200'
//                 };
//             case 'non-compliant':
//             case 'non_compliant':
//                 return {
//                     bgColor: 'bg-red-100',
//                     textColor: 'text-red-800',
//                     borderColor: 'border-red-200'
//                 };
//             case 'crowd sourced':
//             case 'crowd_sourced':
//                 return {
//                     bgColor: 'bg-blue-100',
//                     textColor: 'text-blue-800',
//                     borderColor: 'border-blue-200'
//                 };
//             case 'deleted':
//                 return {
//                     bgColor: 'bg-red-100',
//                     textColor: 'text-red-800',
//                     borderColor: 'border-red-200'
//                 };
//             default:
//                 return {
//                     bgColor: 'bg-gray-100',
//                     textColor: 'text-gray-800',
//                     borderColor: 'border-gray-200'
//                 };
//         }
//     };

//     // Function to get display text for status
//     const getDisplayText = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//                 return 'Approved';
//             case 'published':
//                 return 'Published';
//             case 'draft':
//                 return 'Draft';
//             case 'pending':
//                 return 'Pending';
//             case 'non-compliant':
//             case 'non_compliant':
//                 return 'Non-Compliant';
//             case 'crowd sourced':
//             case 'crowd_sourced':
//                 return 'Crowd Sourced';
//             case 'deleted':
//                 return 'Deleted';
//             default:
//                 return status || 'Unknown';
//         }
//     };

//     const badgeStyle = getBadgeStyle(status);
//     const displayText = getDisplayText(status);

//     return (
//         <span
//             className={`
//                 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                 ${badgeStyle.bgColor} 
//                 ${badgeStyle.textColor} 
//                 ${badgeStyle.borderColor} 
//                 border
//                 ${className}
//             `}
//         >
//             {displayText}
//         </span>
//     );
// };

// export default StatusBadge;


"use client";

import {
  CircleCheck,
  CircleXIcon,
  Clock,
  TriangleAlert,
  TrendingUpDown,
  Trash2,
  HelpCircle,
} from "lucide-react";

/**
 * StatusBadge Component (Hybrid)
 * 
 * Combines icon support and dynamic styling
 * 
 * @param {Object} props
 * @param {string} props.status - The status of the event
 * @param {string} props.className - Optional additional className
 */
const StatusBadge = ({ status, className = "" }) => {
  const normalized = status?.toLowerCase();

  const config = {
    approved: {
      text: "Approved",
      bg: "bg-[#E0F5E6]",
      textColor: "text-[#28A745]",
      border: "border-[#E0F5E6]",
      icon: <CircleCheck className="w-4 h-4 text-[#28A745] mr-1" />,
    },
    published: {
      text: "Published",
      bg: "bg-[#E0F5E6]",
      textColor: "text-[#28A745]",
      border: "border-[#E0F5E6]",
      icon: <CircleCheck className="w-4 h-4 text-[#28A745] mr-1" />,
    },
    draft: {
      text: "Draft",
      bg: "bg-[#FEEBC4]",
      textColor: "text-[#CD8A04]",
      border: "border-[#FEEBC4]",
      icon: <TriangleAlert className="w-4 h-4 text-[#CD8A04] mr-1" />,
    },
    pending: {
      text: "Pending",
      bg: "bg-[#E5E5E5]",
      textColor: "text-[#272727]",
      border: "border-[#E5E5E5]",
      icon: <Clock className="w-4 h-4 text-[#272727] mr-1" />,
    },
    "non-compliant": {
      text: "Non-compliant",
      bg: "bg-red-100",
      textColor: "text-red-600",
      border: "border-red-200",
      icon: <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />,
    },
    "non_compliant": {
      text: "Non-compliant",
      bg: "bg-red-100",
      textColor: "text-red-600",
      border: "border-red-200",
      icon: <CircleXIcon className="w-4 h-4 text-red-500 mr-1" />,
    },
    "crowd sourced": {
      text: "Crowd Sourced",
      bg: "bg-blue-100",
      textColor: "text-blue-600",
      border: "border-blue-200",
      icon: <TrendingUpDown className="w-4 h-4 text-blue-500 mr-1" />,
    },
    "crowd_sourced": {
      text: "Crowd Sourced",
      bg: "bg-blue-100",
      textColor: "text-blue-600",
      border: "border-blue-200",
      icon: <TrendingUpDown className="w-4 h-4 text-blue-500 mr-1" />,
    },
    deleted: {
      text: "Deleted",
      bg: "bg-red-100",
      textColor: "text-red-600",
      border: "border-red-200",
      icon: <Trash2 className="w-4 h-4 text-red-500 mr-1" />,
    },
  };

  const fallback = {
    text: status || "Unknown",
    bg: "bg-gray-100",
    textColor: "text-gray-600",
    border: "border-gray-200",
    icon: <HelpCircle className="w-4 h-4 text-gray-500 mr-1" />,
  };

  const badge = config[normalized] || fallback;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.textColor} ${badge.border} ${className}`}
    >
      {badge.icon}
      {badge.text}
    </span>
  );
};

export default StatusBadge;

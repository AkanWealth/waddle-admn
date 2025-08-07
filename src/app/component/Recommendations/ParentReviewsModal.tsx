// "use client";

// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { Flag, Star } from "lucide-react";
// import Image from "next/image";
// import { useRecommendationsStore } from "@/stores/useRecommendationStore";

// const mockReviews = [
//   {
//     id: "1",
//     name: "Cameron Williamson",
//     avatarUrl: "/avatar.jpg", // replace with real path
//     rating: 4,
//     date: "June 28, 2024",
//     text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
//   },
//   {
//     id: "2",
//     name: "Cameron Williamson",
//     avatarUrl: "/avatar.jpg",
//     rating: 4,
//     date: "June 28, 2024",
//     text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
//   },
//   {
//     id: "3",
//     name: "Cameron Williamson",
//     avatarUrl: "/avatar.jpg",
//     rating: 4,
//     date: "June 28, 2024",
//     text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
//   },
// ];

// const ParentReviewsModal: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const {
//     showParentReviewsModal,
//     closeShowParentReviewsModal,
//     openShowParentReviewsModal,
//   } = useRecommendationsStore();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsOpen(false);
//     };

//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen]);

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) setIsOpen(false);
//   };

//   if (!isOpen) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 overflow-auto"
//       onClick={handleBackdropClick}
//     >
//       <div
//         className={`bg-white rounded-xl shadow-lg w-full ${
//           isMobile ? "h-full m-0 rounded-none" : "max-w-2xl"
//         } p-6 relative overflow-y-auto max-h-[90vh]`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
//             <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
//               ⏺️ Pending
//             </span>
//           </p>
//           <h2 className="text-lg font-semibold mb-1">
//             Fun Forest Walk – Highwoods Country Park
//           </h2>
//           <p className="text-sm text-gray-700">
//             <span className="font-bold text-green-600 text-lg">92%</span> of
//             parents recommend this place
//           </p>
//           <p className="text-sm text-gray-500">Based on 56 Waddle reviews</p>
//         </div>

//         <hr className="my-4" />

//         {/* Reviews */}
//         <div className="space-y-6">
//           {mockReviews.map((review) => (
//             <div
//               key={review.id}
//               className="border rounded-lg p-4 shadow-sm bg-gray-50"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <Image
//                   src={review.avatarUrl}
//                   alt={review.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold">{review.name}</p>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <div className="flex">
//                       {Array.from({ length: review.rating }).map((_, i) => (
//                         <Star
//                           key={i}
//                           className="w-4 h-4 fill-yellow-500 text-yellow-500"
//                         />
//                       ))}
//                       {Array.from({ length: 5 - review.rating }).map((_, i) => (
//                         <Star key={i} className="w-4 h-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <span>{review.date}</span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm">{review.text}</p>

//               <button className="mt-3 flex items-center gap-1 text-red-600 border border-red-600 rounded-md px-3 py-1 text-sm hover:bg-red-50">
//                 <Flag className="w-4 h-4" />
//                 Unflag
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default ParentReviewsModal;

"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Flag } from "lucide-react";
import Image from "next/image";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";

const mockReviews = [
  {
    id: "1",
    name: "Cameron Williamson",
    avatarUrl: "/avatar.jpg",
    rating: 4,
    date: "June 28, 2024",
    text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
  },
  {
    id: "2",
    name: "Cameron Williamson",
    avatarUrl: "/avatar.jpg",
    rating: 4,
    date: "June 28, 2024",
    text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
  },
  {
    id: "3",
    name: "Cameron Williamson",
    avatarUrl: "/avatar.jpg",
    rating: 4,
    date: "June 28, 2024",
    text: "What really sets Chef Foods apart is their ability to cater for kids with nutritional meals",
  },
];

const ParentReviewsModal: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const {
    showParentReviewsModal,
    closeShowParentReviewsModal,
    //openShowParentReviewsModal,
  } = useRecommendationsStore();

  console.log("Parent stuff");
  // Handle window resizing to determine if it's mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle ESC key + body scroll
  useEffect(() => {
    if (showParentReviewsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeShowParentReviewsModal();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showParentReviewsModal, closeShowParentReviewsModal]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeShowParentReviewsModal();
  };

  if (!showParentReviewsModal) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full ${
          isMobile ? "h-full m-0 rounded-none" : "max-w-2xl"
        } p-6 relative overflow-y-auto max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-[#404040] font-semibold text-[19px] my-3">
            Reviews
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
              ⏺️ Pending
            </span>
          </p>
          <h2 className="text-lg font-semibold mb-1 text-[#404040]">
            Fun Forest Walk – Highwoods Country Park
          </h2>
          <p className="text-sm text-gray-700">
            <span className="font-bold text-green-600 text-lg">92%</span> of
            parents recommend this place
          </p>
          <p className="text-sm text-gray-500">Based on 56 Waddle reviews</p>
        </div>

        <hr className="my-4" />

        {/* Reviews */}
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={review.avatarUrl}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {/* <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div> */}
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm">{review.text}</p>

              <button className="mt-3 flex items-center gap-1 text-red-600 border border-red-600 rounded-md px-3 py-1 text-sm hover:bg-red-50">
                <Flag className="w-4 h-4" />
                Unflag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ParentReviewsModal;

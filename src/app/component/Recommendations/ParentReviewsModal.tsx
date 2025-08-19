// "use client";
// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { Flag } from "lucide-react";
// import Image from "next/image";
// import { useRecommendationsStore } from "@/stores/useRecommendationStore";
// import { recommendationService } from "@/utils/recommendationService";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import Pagination from "../BookingManagement/Pagination";

// dayjs.extend(relativeTime);

// const ParentReviewsModal: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const { selectedPlace, showParentReviewsModal, closeShowParentReviewsModal } =
//     useRecommendationsStore();

//   const fetchReviews = async (pageNum = 1) => {
//     try {
//       const response =
//         await recommendationService.getAllRecommendationsPlacesByPage(
//           // selectedPlace?.id ||
//            "cmdzywhqg000mu0mfnasp4lfr",
//           pageNum
//         );

//       if (response.success) {
//         const { reviews, totalPages } = response.data; // ✅ Correct extraction
//         setReviews(reviews);
//         setTotalPages(totalPages || 1);
//         setPage(pageNum);
//       } else {
//         console.error("Failed to fetch reviews:", response.error);
//       }
//     } catch (error) {
//       console.error("Failed to fetch reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (showParentReviewsModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") closeShowParentReviewsModal();
//     };

//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [showParentReviewsModal, closeShowParentReviewsModal]);

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) closeShowParentReviewsModal();
//   };

//   if (!showParentReviewsModal) return null;

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
//           <h3 className="text-[#404040] font-semibold text-[19px] my-3">
//             Reviews
//           </h3>
//           <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
//             <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
//               {selectedPlace?.status}
//             </span>
//           </p>
//           <h2 className="text-[20px] font-semibold my-2 text-[#404040]">
//             {selectedPlace?.name || "Fun Forest Walk"}
//           </h2>
//           <div className="flex items-center gap-4">
//             <Image
//               src="/Reward.svg"
//               alt="Reward"
//               width={32}
//               height={32}
//               className="rounded-lg"
//             />
//             <div className="flex flex-col gap-1.5">
//               <p className="text-sm text-[#303237] flex items-end gap-1">
//                 <span className="font-bold  text-[20px]">92%</span>
//                 <span className="">of parents recommend this place</span>
//               </p>
//               <p className="text-sm text-[#565C69] font-normal">
//                 Based on 56 Waddle reviews
//               </p>
//             </div>
//           </div>
//         </div>

//         <hr className="my-4" />

//         {/* Reviews */}
//         <div className="space-y-6">
//           {reviews?.length > 0 ? (
//             reviews.map((review: any) => (
//               <div key={review.id} className="border rounded-lg p-4 shadow-sm">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Image
//                     src={review.user?.profile_picture || "/avatar.jpg"}
//                     alt={review.user?.name || "User"}
//                     width={40}
//                     height={40}
//                     className="rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-[#303237]">
//                       {review.user?.name || "Anonymous"}
//                     </p>
//                     <p className="text-sm text-[#7E8494] font-normal">
//                       {dayjs(review.createdAt).fromNow()}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-gray-700 text-sm">{review.comment}</p>

//                 <button className="mt-3 flex items-center gap-1 text-red-600 border border-red-600 rounded-md px-3 py-1 text-sm hover:bg-red-50">
//                   <Flag className="w-4 h-4" />
//                   Unflag
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No reviews yet.</p>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-6">
//             <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={fetchReviews}
//             />
//           </div>
//         )}
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
import { recommendationService } from "@/utils/recommendationService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pagination from "../BookingManagement/Pagination";

dayjs.extend(relativeTime);

const ParentReviewsModal: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    selectedPlace,
    selectedEvent,
    parentReviewsContext,
    showParentReviewsModal,
    closeShowParentReviewsModal,
  } = useRecommendationsStore();

  // Determine context (place/event) from current selection
  const context: "place" | "event" =
    parentReviewsContext ?? (selectedEvent ? "event" : "place");
  const itemId =
    (context === "event" ? selectedEvent?.id : selectedPlace?.id) ||
    "cmdzywhqg000mu0mfnasp4lfr";
  const itemName =
    context === "event" ? selectedEvent?.name : selectedPlace?.name;
  const itemStatus =
    context === "event" ? selectedEvent?.status : selectedPlace?.status;

  const fetchReviews = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response =
        await recommendationService.getAllRecommendationsPlacesByPage(
          itemId,
          pageNum
        );

      if (response.success) {
        const { reviews, totalPages } = response.data;
        setReviews(reviews);
        setTotalPages(totalPages || 1);
        setPage(pageNum);
      } else {
        console.error("Failed to fetch reviews:", response.error);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              {itemStatus}
            </span>
          </p>
          <h2 className="text-[20px] font-semibold my-2 text-[#404040]">
            {itemName || "Fun Forest Walk"}
          </h2>
          <div className="flex items-center gap-4">
            <Image
              src="/Reward.svg"
              alt="Reward"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[#303237] flex items-end gap-1">
                <span className="font-bold  text-[20px]">92%</span>
                <span className="">
                  of parents recommend this{" "}
                  {context === "place" ? "place" : "event"}
                </span>
              </p>
              <p className="text-sm text-[#565C69] font-normal">
                Based on 56 Waddle reviews
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Reviews or Loader */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : reviews?.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reviews.map((review: any) => (
              <div key={review.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={review.user?.profile_picture || "/avatar.jpg"}
                    alt={review.user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full h-[40px] w-[40px] object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#303237]">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-[#7E8494] font-normal">
                      {dayjs(review.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm">{review.comment}</p>

                <button className="mt-3 flex items-center gap-1 text-red-600 border border-red-600 rounded-md px-3 py-1 text-sm hover:bg-red-50">
                  <Flag className="w-4 h-4" />
                  Unflag
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages >= 1 && reviews.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={fetchReviews}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ParentReviewsModal;

// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { X } from "lucide-react";
// import { useRecommendationsStore } from "@/stores/useRecommendationStore";

// interface RejectPlaceModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (vendorId: string, reason: string) => void;
// }

// const RejectPlaceModal: React.FC<RejectPlaceModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
// }) => {
//   const { selectedPlace } = useRecommendationsStore();
//   console.log(selectedPlace, "This is the selected place");
//   const [suspensionReason, setSuspensionReason] = useState("");
//   const [error, setError] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

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
//       setSuspensionReason("");
//       setError(false);
//       document.body.style.overflow = "hidden"; // prevent scroll
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen, onClose]);

//   const handleConfirm = () => {
//     if (!suspensionReason.trim()) {
//       setError(true);
//       return;
//     }
//     console.log(eventData, "This is the event");

//     if (eventData?.id) {
//       onConfirm(eventData.id, suspensionReason);
//     }

//     onClose();
//   };

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   if (!isOpen) return null;
//   //   <div
//   //   className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
//   //   role="dialog"
//   //   aria-modal="true"
//   // ></div>

//   return createPortal(
//     <div
//       className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-auto"
//       onClick={handleBackdropClick}
//     >
//       <div
//         className={`bg-white rounded-xl shadow-lg w-full ${
//           isMobile ? "h-full m-0 rounded-none" : "max-w-md"
//         } p-6 relative`}
//         style={{
//           maxWidth: isMobile ? "100%" : "500px",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-2xl text-gray-600"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           &times;
//         </button>

//         {/* Title and Icon */}

//         <div className="flex items-center mb-4 gap-3">
//           <div className="bg-[#F6AAA8] rounded-full p-4">
//             <X className="h-6 w-6 text-[#CC0000]" />
//           </div>
//           <div className="">
//             {!isMobile && (
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Reject This Place?
//               </h2>
//             )}
//             <p className="text-gray-700 text-center">
//               Are you sure you want to reject this submission?
//             </p>
//           </div>
//         </div>

//         {/* Reason Textarea */}
//         <div className="mb-4">
//           <label className="block mb-2 font-semibold text-gray-700">
//             Provide a reason for suspension{" "}
//             <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             value={suspensionReason}
//             onChange={(e) => {
//               setSuspensionReason(e.target.value);
//               if (e.target.value.trim()) setError(false);
//             }}
//             className={`w-full text-black border ${
//               error ? "border-red-500" : "border-gray-300"
//             } rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300`}
//             placeholder="e.g., Violation of platform guidelines"
//           />
//           {error && (
//             <p className="text-red-500 text-sm mt-1">
//               Please provide a reason for suspension
//             </p>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center  gap-3 justify-between">
//           <button
//             onClick={handleConfirm}
//             className="bg-[#CC0000] flex-1 text-white py-3 px-4 rounded-lg text-sm font-semibold w-full md:w-auto"
//           >
//             Reject Place
//           </button>
//           <button
//             onClick={onClose}
//             className="border flex-1 border-[#2853A6] text-[#2853A6] py-2.5 px-4 text-sm rounded-lg font-semibold w-full md:w-auto"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default RejectPlaceModal;

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import { recommendationService } from "@/utils/recommendationService";
import { useMessageContext } from "@/context/toast";

interface RejectPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RejectPlaceModal: React.FC<RejectPlaceModalProps> = ({
  isOpen,
  onClose
}) => {
  const { selectedPlace, refreshEvents } = useRecommendationsStore();
  const { showMessage } = useMessageContext();

  const [suspensionReason, setSuspensionReason] = useState("");
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSuspensionReason("");
      setError(false);
      document.body.style.overflow = "hidden"; // prevent scroll
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleConfirm = async () => {
    if (!suspensionReason.trim()) {
      setError(true);
      return;
    }
    if (!selectedPlace) return;

    console.log(selectedPlace, "This is the selected place in handleConfirm");
    try {
      const response = await recommendationService.rejectARecommendationPlace(
        selectedPlace.id
      );
      if (response.success) {
        refreshEvents("Places");
        onClose();
        showMessage("Place Rejected!", "Place has been rejected", "success");
      }
    } catch (error) {
      console.log(error);
    }

    // if (selectedPlace?.id) {
    //   onConfirm(selectedPlace.id, suspensionReason);
    // }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full ${
          isMobile ? "h-full m-0 rounded-none" : "max-w-md"
        } p-6 relative`}
        style={{
          maxWidth: isMobile ? "100%" : "500px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title and Icon */}
        <div className="flex items-center mb-4 gap-3">
          <div className="bg-[#F6AAA8] rounded-full p-4">
            <X className="h-6 w-6 text-[#CC0000]" />
          </div>
          <div className="">
            {!isMobile && (
              <h2 className="text-xl font-semibold text-gray-800">
                Reject This Place?
              </h2>
            )}
            <p className="text-gray-700 text-center">
              Are you sure you want to reject this submission?
            </p>
            {selectedPlace && (
              <p className="text-sm text-gray-600 mt-1">
                Place: <strong>{selectedPlace.name}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Reason Textarea */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">
            Provide a reason for suspension{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            value={suspensionReason}
            onChange={(e) => {
              setSuspensionReason(e.target.value);
              if (e.target.value.trim()) setError(false);
            }}
            className={`w-full text-black border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300`}
            placeholder="e.g., Violation of platform guidelines"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">
              Please provide a reason for suspension
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-between">
          <button
            onClick={handleConfirm}
            className="bg-[#CC0000] flex-1 text-white py-3 px-4 rounded-lg text-sm font-semibold w-full md:w-auto"
          >
            Reject Place
          </button>
          <button
            onClick={onClose}
            className="border flex-1 border-[#2853A6] text-[#2853A6] py-2.5 px-4 text-sm rounded-lg font-semibold w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RejectPlaceModal;

// import React, { useState, useEffect } from 'react';
// import BaseModal from '../../Element/BaseModal';
// import { XCircle } from 'lucide-react';

// /**
//  * RejectVendorModal Component
//  * 
//  * @param {Object} props
//  * @param {Object} props.vendor - Vendor data
//  * @param {boolean} props.isOpen - Controls modal visibility
//  * @param {function} props.onClose - Function to call when modal closes
//  * @param {function} props.onConfirm - Function to handle vendor rejection confirmation
//  */
// const RejectEventModal = ({ 
//   vendor = null, 
//   isOpen, 
//   onClose, 
//   onConfirm 
// }) => {
//   // State for rejection reason
//   const [rejectionReason, setRejectionReason] = useState('');
//   // Validation error state
//   const [error, setError] = useState(false);
  
//   // Check if the viewport is mobile
//   const [isMobile, setIsMobile] = useState(false);
  
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIfMobile);
//     };
//   }, []);

//   // Reset form when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setRejectionReason('');
//       setError(false);
//     }
//   }, [isOpen]);
  
//   // Handle confirmation
//   const handleConfirm = () => {
//     if (onConfirm) onConfirm(vendorData.id);
//     onClose();
//   };

// const modalActions = {
//     approve: {
//       label: " Reject Event",
//       onClick: handleConfirm,
//       className: "bg-red-600 text-white py-3 px-4 rounded-lg text-sm font-medium text-center flex-1"
//     },
//     cancel: {
//       label: "Cancel",
//       onClick: onClose,
//       className: "border border-gray-300 text-gray-700 py-2 px-4 text-sm rounded-lg font-medium flex-1"
//     }
//   };

//   // Handle reject button click
//   const handleReject = () => {
//     if (!rejectionReason.trim()) {
//       setError(true);
//       return;
//     }
    
//     if (onConfirm) {
//       onConfirm(vendor?.id, rejectionReason);
//     }
//     onClose();
//   };
  
//   return (
//     <BaseModal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Reject Event"
//       actions={modalActions}
//       size={{ width: isMobile ? "100%" : "500px", maxWidth: isMobile ? "100%" : "500px" }}
//       className={isMobile ? "m-0 rounded-none h-full" : ""}
//       showDividers={false}
//     >
//       <div className="flex flex-col">
//         {/* Icon and Title */}
//         <div className="flex flex-col-2 gap-2 items-center mb-4">
//           <div className="bg-red-100 rounded-full p-4 mb-4">
//             <XCircle className="h-6 w-6 text-red-500" />
//           </div>
//           <p className="text-gray-700 mb-6">
//           You are about to reject Family Fun Day. The event provider will be notified with your reason for rejection.
//         </p>
//           {/* <h3 className="text-lg font-medium text-center">Reject Vendor</h3> */}
//         </div>
        
//         {/* Rejection message */}
        
        
//         {/* Rejection reason input */}
//         <div className="mb-2">
//           <label className="block mb-2 font-bold text-gray-700">
//             Provide a reason for rejection <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300`}
//             placeholder="e.g., Incorrect Unique Taxpayer Reference"
//             value={rejectionReason}
//             onChange={(e) => {
//               setRejectionReason(e.target.value);
//               if (e.target.value.trim()) setError(false);
//             }}
//           />
//           {error && (
//             <p className="text-red-500 text-sm mt-1">Please provide a reason for rejection</p>
//           )}
//         </div>
        
//         {/* Action buttons */}
//         {/* <div className={`w-full flex ${isMobile ? 'flex-row' : 'flex-row'} gap-3`}>
//           <button
//             onClick={handleReject}
//             className={`${isMobile ? 'w-full' : 'w-auto'} bg-red-600 text-white py-3 px-6 rounded-lg font-medium text-center`}
//           >
//             Reject Vendor
//           </button>
//           <button
//             onClick={onClose}
//             className={`${isMobile ? 'w-full' : 'w-auto'} border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium text-center`}
//           >
//             Cancel
//           </button>
//         </div> */}
//       </div>
//     </BaseModal>
//   );
// };

// export default RejectEventModal;
// import React, { useState, useEffect } from 'react';
// import BaseModal from '../../Element/BaseModal';
// import ApproveVendorModal from './approveVendorModal';
// import RejectVendorModal from './RejectVendorModal';

// /**
//  * VendorDetailsModal Component
//  * 
//  * @param {Object} props
//  * @param {Object} props.vendor - Vendor data
//  * @param {boolean} props.isOpen - Controls modal visibility
//  * @param {function} props.onClose - Function to call when modal closes
//  * @param {function} props.onApprove - Function to handle vendor approval
//  * @param {function} props.onReject - Function to handle vendor rejection
//  */
// const VendorDetailsModal = ({ 
//   vendor = null, 
//   isOpen, 
//   onClose, 
//   onApprove, 
//   onReject 
// }) => {
//   // State for modals
//   const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
//   // Mock data for demonstration
//   const mockVendorData = {
//     name: "Elite Dancer School",
//     contactName: "John Smith",
//     description: "Designed to teach and train family both parents and children. this is very nice this rich and enjoyable. Bring your kids let us train them to be professional from foundation.",
//     contactDetails: {
//       phone: "+4498274774",
//       email: "aurajean@cheffood.com",
//       address: "362 Sycamore St, Detroit, MI",
//       website: "www.elitedancers.com"
//     },
//     taxId: "123456789",
//     businessLicense: "Elite Dancer Business Licence.PDF",
//     status: "Pending"
//   };
  
//   // If no vendor is passed, use the mock data
//   const vendorData = vendor || mockVendorData;
  
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
  
//   // Handle approve button click - opens approval modal
//   const handleApproveClick = () => {
//     // Close details modal
//     onClose();
//     // Open approve modal
//     setIsApproveModalOpen(true);
//   };
  
//   // Handle reject button click - opens reject modal
//   const handleRejectClick = () => {
//     // Close details modal
//     onClose();
//     // Open reject modal
//     setIsRejectModalOpen(true);
//   };
  
//   // Handle final approval from the approve modal
//   const handleFinalApprove = () => {
//     if (onApprove) onApprove(vendorData.id);
//     setIsApproveModalOpen(false);
//   };
  
//   // Handle final rejection from the reject modal
//   const handleFinalReject = (id, reason) => {
//     if (onReject) onReject(id, reason);
//     setIsRejectModalOpen(false);
//   };
  
//   // Action buttons configuration
//   const modalActions = {
//     reject: {
//       label: "Reject",
//       onClick: handleRejectClick,
//       className: isMobile ? 
//         "w-full border border-red-500 text-red-500 py-2 px-6 rounded-lg font-medium text-center" :
//         "w-full md:w-auto border border-red-500 text-red-500 py-2 px-6 rounded-lg font-medium text-center"
//     },
//     approve: {
//       label: "Approve",
//       onClick: handleApproveClick,
//       className: isMobile ?
//         "w-full bg-blue-600 text-white py-2 px-6 rounded-lg font-medium text-center" :
//         "w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg font-medium text-center"
//     }
//   };

//   // Mobile view layout
//   if (isMobile) {
//     return (
//       <>
//         <BaseModal
//           isOpen={isOpen}
//           onClose={onClose}
//           title="Vendor's Profile"
//           size={{ width: "99%", maxWidth: "99%" }}
//           className="m-0 rounded-none max-h-full h-full"
//         >
//           <div className="flex flex-col h-full">
//             {/* Buttons at the top for mobile */}
//             <div className="flex flex-col w-full space-y-3 mb-6">
//               <button
//                 onClick={modalActions.reject.onClick}
//                 className={modalActions.reject.className}
//               >
//                 {modalActions.reject.label}
//               </button>
//               <button
//                 onClick={modalActions.approve.onClick}
//                 className={modalActions.approve.className}
//               >
//                 {modalActions.approve.label}
//               </button>
//             </div>
            
//             <hr className="border-gray-200 mb-6" />
            
//             {/* Vendor Name and Status */}
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-medium">{vendorData.name}</h3>
//               {vendorData.status === "Pending" && (
//                 <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
//                   <span className="mr-1.5">•</span> Pending
//                 </div>
//               )}
//             </div>
            
//             {/* Contact Name */}
//             <div className="mb-6">
//               <p className="text-gray-600">{vendorData.contactName}</p>
//               <p className="mt-2 text-gray-700">{vendorData.description}</p>
//             </div>
            
//             <hr className="border-gray-200 mb-6" />
            
//             {/* Contact Details */}
//             <div className="mb-6">
//               <h4 className="text-gray-700 mb-3">Contact Details</h4>
//               <div className="space-y-3">
//                 <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   {vendorData.contactDetails.phone}
//                 </div>
                
//                 <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   {vendorData.contactDetails.email}
//                 </div>
                
//                 <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   {vendorData.contactDetails.address}
//                 </div>
                
//                 <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                   </svg>
//                   {vendorData.contactDetails.website}
//                 </div>
//               </div>
//             </div>
            
//             <hr className="border-gray-200 mb-6" />
            
//             {/* UTR */}
//             <div className="mb-6">
//               <h4 className="text-gray-700 mb-3">Unique Taxpayer Reference (UTR)</h4>
//               <div className="border rounded-lg p-3 bg-gray-50 text-gray-700">
//                 {vendorData.taxId}
//               </div>
//             </div>
            
//             {/* Business License */}
//             <div className="mb-6">
//               <h4 className="text-gray-700 mb-3">Business License Document</h4>
//               <div className="flex items-center">
//                 <div className="border rounded-lg overflow-hidden mr-2">
//                   <div className="w-12 h-14 relative bg-white p-2">
//                     <div className="w-full h-full border-2 border-gray-200 flex items-center justify-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-6 h-4 bg-red-600 text-white text-xs flex items-center justify-center">
//                       PDF
//                     </div>
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-600">{vendorData.businessLicense}</span>
//               </div>
//             </div>
//           </div>
//         </BaseModal>
        
//         {/* Approve Vendor Modal */}
//         <ApproveVendorModal 
//           vendor={vendorData}
//           isOpen={isApproveModalOpen}
//           onClose={() => setIsApproveModalOpen(false)}
//           onConfirm={handleFinalApprove}
//         />
        
//         {/* Reject Vendor Modal */}
//         <RejectVendorModal 
//           vendor={vendorData}
//           isOpen={isRejectModalOpen}
//           onClose={() => setIsRejectModalOpen(false)}
//           onConfirm={handleFinalReject}
//         />
//       </>
//     );
//   }

//   // Desktop view layout
//   return (
//     <>
//       <BaseModal
//         isOpen={isOpen}
//         onClose={onClose}
//         title="Vendor's Profile"
//         actions={modalActions}
//         buttonPlacement="top-left"
//         size={{ width: "80%", maxWidth: "750px" }}
//       >
//         <div className="space-y-6">
//           {/* Vendor Name and Status */}
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-medium">{vendorData.name}</h3>
//             {vendorData.status === "Pending" && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
//                 <span className="mr-1.5">•</span> Pending
//               </span>
//             )}
//           </div>
//                     <hr className="border-gray-300 mb-6" />
//           {/* Contact Name */}
//           <div>
//             <p className="text-gray-600">{vendorData.contactName}</p>
//             <p className="mt-2 text-gray-700">{vendorData.description}</p>
//           </div>
//                     <hr className="border-gray-300 mb-6" />
//           {/* Contact Details */}
//           <div>
//             <h4 className="text-gray-700 mb-3">Contact Details</h4>
//             <div className="space-y-2">
//               <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
//                 <span className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                   {vendorData.contactDetails.phone}
//                 </span>
//               </div>
              
//               <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
//                 <span className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   {vendorData.contactDetails.email}
//                 </span>
//               </div>
              
//               <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
//                 <span className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   {vendorData.contactDetails.address}
//                 </span>
//               </div>
              
//               <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
//                 <span className="flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                   </svg>
//                   {vendorData.contactDetails.website}
//                 </span>
//               </div>
//             </div>
//           </div>          
//           <hr className="border-gray-300 mb-6" />
          
//           {/* UTR */}
//           <div>
//             <h4 className="text-gray-700 mb-3">Unique Taxpayer Reference (UTR)</h4>
//             <div className="border rounded-lg p-3 bg-gray-50 text-gray-700">
//               {vendorData.taxId}
//             </div>
//           </div>
          
//           {/* Business License */}
//           <div>
//             <h4 className="text-gray-700 mb-3">Business License Document</h4>
//             <div className="inline-flex items-center">
//               <div className="border rounded-lg overflow-hidden mr-2">
//                 <div className="w-12 h-14 relative bg-white p-2">
//                   <div className="w-full h-full border-2 border-gray-200 flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-6 h-4 bg-red-600 text-white text-xs flex items-center justify-center">
//                     PDF
//                   </div>
//                 </div>
//               </div>
//               <span className="text-sm text-gray-600">{vendorData.businessLicense}</span>
//             </div>
//           </div>
//         </div>
//       </BaseModal>
      
//       {/* Approve Vendor Modal */}
//       <ApproveVendorModal 
//         vendor={vendorData}
//         isOpen={isApproveModalOpen}
//         onClose={() => setIsApproveModalOpen(false)}
//         onConfirm={handleFinalApprove}
//       />
      
//       {/* Reject Vendor Modal */}
//       <RejectVendorModal 
//         vendor={vendorData}
//         isOpen={isRejectModalOpen}
//         onClose={() => setIsRejectModalOpen(false)}
//         onConfirm={handleFinalReject}
//       />
//     </>
//   );
// };

// export default VendorDetailsModal;





import React, { useState, useEffect } from 'react';
import BaseModal from '../../Element/BaseModal';
import ApproveVendorModal from './approveVendorModal';
import RejectVendorModal from './RejectVendorModal';

/**
 * VendorDetailsModal Component
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Vendor data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onApprove - Function to handle vendor approval
 * @param {function} props.onReject - Function to handle vendor rejection
 * @param {function} props.onRefresh - Function to refresh vendors list after action
 * @param {boolean} props.isApproving - Loading state for approval action
 * @param {boolean} props.isRejecting - Loading state for rejection action
 */
const VendorDetailsModal = ({ 
  vendor = null, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject,
  onRefresh,
  isApproving = false,
  isRejecting = false
}) => {
  // State for modals
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
  // Mock data for demonstration (fallback)
  const mockVendorData = {
    name: "Elite Dancer School",
    contactName: "John Smith",
    description: "Designed to teach and train family both parents and children. this is very nice this rich and enjoyable. Bring your kids let us train them to be professional from foundation.",
    contactDetails: {
      phone: "+4498274774",
      email: "aurajean@cheffood.com",
      address: "362 Sycamore St, Detroit, MI",
      website: "www.elitedancers.com"
    },
    taxId: "123456789",
    businessLicense: "Elite Dancer Business Licence.PDF",
    status: "Pending"
  };
  
  // If no vendor is passed, use the mock data
  const vendorData = vendor || mockVendorData;
  
  // Check if the viewport is mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Handle approve button click - opens approval modal
  const handleApproveClick = () => {
    if (isApproving || isRejecting) return; // Prevent action if loading
    
    // Close details modal
    onClose();
    // Open approve modal
    setIsApproveModalOpen(true);
  };
  
  // Handle reject button click - opens reject modal
  const handleRejectClick = () => {
    if (isApproving || isRejecting) return; // Prevent action if loading
    
    // Close details modal
    onClose();
    // Open reject modal
    setIsRejectModalOpen(true);
  };
  
  // Handle final approval from the approve modal
  const handleFinalApprove = async () => {
    try {
      if (onApprove) {
        await onApprove(vendorData.id);
      }
      setIsApproveModalOpen(false);
      
      // Refresh the vendors list if callback provided
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Error in approval process:', error);
      // Keep modal open on error so user can retry
    }
  };
  
  // Handle final rejection from the reject modal
  const handleFinalReject = async (vendorId, reason) => {
    try {
      if (onReject) {
        await onReject(vendorId, reason);
      }
      setIsRejectModalOpen(false);
      
      // Refresh the vendors list if callback provided
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error('Error in rejection process:', error);
      // Keep modal open on error so user can retry
    }
  };
  
  // Determine if any action is in progress
  const isProcessing = isApproving || isRejecting;
  
  // Action buttons configuration
  const modalActions = {
    reject: {
      label: isRejecting ? "Rejecting..." : "Reject",
      onClick: handleRejectClick,
      disabled: isProcessing,
      className: isMobile ? 
        `w-full border border-red-500 py-2 px-6 rounded-lg font-medium text-center transition-colors ${
          isProcessing 
            ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
            : 'text-[#CC0000] cursor-pointer hover:bg-red-50'
        }` :
        `w-full md:w-auto border border-red-500 py-2 px-6 rounded-lg font-medium text-center transition-colors ${
          isProcessing 
            ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
            : 'text-[#CC0000] cursor-pointer hover:bg-red-50'
        }`
    },
    approve: {
      label: isApproving ? "Approving..." : "Approve",
      onClick: handleApproveClick,
      disabled: isProcessing,
      className: isMobile ?
        `w-full py-2 px-6 rounded-lg font-medium text-center transition-colors ${
          isProcessing 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#2853A6] text-white hover:bg-blue-700'
        }` :
        `w-full md:w-auto py-2 px-6 rounded-lg font-medium text-center transition-colors ${
          isProcessing 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#2853A6] cursor-pointer text-white hover:bg-blue-700'
        }`
    }
  };

  const getFileType = (url) => {
  const ext = url?.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'PDF';
  if (ext === 'doc' || ext === 'docx') return 'DOC';
  return '';
};


  // Render loading indicator for buttons
  const renderButtonContent = (action) => {
    const isCurrentActionLoading = 
      (action === 'approve' && isApproving) || 
      (action === 'reject' && isRejecting);
      
    return (
      <span className="flex items-center justify-center">
        {isCurrentActionLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {modalActions[action].label}
      </span>
    );
  };

  // Mobile view layout
  if (isMobile) {
    return (
      <>
        <BaseModal
          isOpen={isOpen}
          onClose={onClose}
          title="Vendor's Profile"
          size={{ width: "99%", maxWidth: "99%" }}
          className="m-0 rounded-none max-h-full h-full"
        >
          <div className="flex flex-col h-full">
            {/* Loading indicator at top if processing */}
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg 
                    className="animate-spin h-4 w-4 text-blue-600 mr-2" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-blue-800 text-sm">
                    {isApproving ? 'Approving vendor...' : 'Rejecting vendor...'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Buttons at the top for mobile */}
            <div className="flex flex-col w-full space-y-3 mb-6">
              <button
                onClick={modalActions.reject.onClick}
                disabled={modalActions.reject.disabled}
                className={modalActions.reject.className}
              >
                {renderButtonContent('reject')}
              </button>
              <button
                onClick={modalActions.approve.onClick}
                disabled={modalActions.approve.disabled}
                className={modalActions.approve.className}
              >
                {renderButtonContent('approve')}
              </button>
            </div>
            
            <hr className="border-gray-200 mb-6" />
            
            {/* Vendor Name and Status */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{vendorData.name || "hELLO"}</h3>
              {vendorData.status === "Pending" && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  <span className="mr-1.5">•</span> Pending
                </div>
              )}
            </div>
            
            {/* Contact Name */}
            <div className="mb-6">
              <p className="text-gray-600">{vendorData.business_name}</p>

              <p className="mt-2 text-gray-700">{vendorData.description || "Random description"}</p>
            </div>

            
            {/* <hr className="border-gray-200 mb-6" /> */}
            
            {/* Contact Details */}
            <div className="mb-6">
              <h4 className="text-gray-700 mb-3">Contact Details</h4>
              <div className="space-y-3">
                <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {vendorData.phone_number}
                </div>
                
                <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {vendorData.email}
                </div>
                
                <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vendorData.address}
                </div>
                
                {
                  vendorData.website &&
                <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  {vendorData.website}
                </div>
                }

              </div>
            </div>
            
            <hr className="border-gray-200 mb-6" />
            
            {/* UTR */}
            {/* <div className="mb-6">
              <h4 className="text-gray-700 mb-3">Unique Taxpayer Reference (UTR)</h4>
              <div className="border rounded-lg p-3 bg-gray-50 text-gray-700">
                {vendorData.taxId || vendorData.registrationNumber || 'N/A'}
              </div>
            </div> */}
            
            {/* Business License */}
<div>
  <h4 className="text-gray-700 mb-3">Business License Document</h4>
  <div className="inline-flex items-center">
    <div className="border rounded-lg overflow-hidden mr-2">
      <div className="w-12 h-14 relative bg-white p-2">
        <div className="w-full h-full border-2 border-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        {vendorData.attachment && (
          <div className="absolute bottom-0 right-0 w-6 h-4 bg-red-600 text-white text-xs flex items-center justify-center">
            {getFileType(vendorData.attachment) || 'FILE'}
          </div>
        )}
      </div>
    </div>
    <span className="text-sm text-gray-600">
      {vendorData.attachment
        ? `View ${getFileType(vendorData.attachment) || 'Document'}`
        : 'No document uploaded'}
    </span>
  </div>
</div>

          </div>
        </BaseModal>
        
        {/* Approve Vendor Modal */}
        <ApproveVendorModal 
          vendor={vendorData}
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          onConfirm={handleFinalApprove}
          isLoading={isApproving}
        />
        
        {/* Reject Vendor Modal */}
        <RejectVendorModal 
          vendor={vendorData}
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          onConfirm={handleFinalReject}
          isLoading={isRejecting}
        />
      </>
    );
  }

  // Desktop view layout
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Vendor's Profile"
        actions={modalActions}
        buttonPlacement="top-left"
        size={{ width: "80%", maxWidth: "750px" }}
      >
        <div className="space-y-6">
          {/* Loading indicator at top if processing */}
          {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center">
                <svg 
                  className="animate-spin h-4 w-4 text-blue-600 mr-2" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-blue-800 text-sm">
                  {isApproving ? 'Approving vendor...' : 'Rejecting vendor...'}
                </span>
              </div>
            </div>
          )}
          
          {/* Vendor Name and Status */}
          <div className="flex bg- items-center justify-between">
            <h3 className="text-lg text-[#303237] font-semibold">{vendorData.business_name || "Hello"}</h3>
            {vendorData.status === "Pending" ||"PENDING" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                <span className="mr-1.5">•</span> Pending
              </span>
            )}
          </div>

            <p className="text-[#7E8494] font-semibold">{vendorData.name}</p>

          {/* <hr className="border-gray-300 mb-6" /> */}
                    {/* <hr className="border-gray-300 mb-6" /> */}

          {/* Contact Name */}
          <div>
            <p className="mt-2 text-gray-700">{vendorData.description || "Random description"}</p>
          </div>
          
                        {console.log(vendorData, "This is the vendor data")}

          {/* Contact Details */}
          <div>
            <h4 className="text-gray-700 mb-3">Contact Details</h4>
            {
              vendorData.phone_number && 
                          <div className="space-y-2">
              <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {vendorData.phone_number}
                </span>
              </div>
              
              <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {vendorData.email}
                </span>
              </div>
              
              <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vendorData.address}
                </span>
              </div>
              
              {
                vendorData.website &&               <div className="bg-amber-100 rounded-full px-3 py-2 inline-block">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  {vendorData.website}
                </span>
              </div>
              }

            </div>
            }

          </div>          
          <hr className="border-gray-300 mb-6" />
          
          {/* UTR */}
          {/* <div>
            <h4 className="text-gray-700 mb-3">Unique Taxpayer Reference (UTR)</h4>
            <div className="border rounded-lg p-3 bg-gray-50 text-gray-700">
              {vendorData.taxId || vendorData.registrationNumber || 'N/A'}
            </div>
          </div> */}
          
          {/* Business License */}
          <div>
  <h4 className="text-gray-700 mb-3">Business License Document</h4>
  <div className="inline-flex items-center">
    <div className="border rounded-lg overflow-hidden mr-2">
      <div className="w-12 h-14 relative bg-white p-2">
        <div className="w-full h-full border-2 border-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        {vendorData.businessLicense && (
          <div className="absolute bottom-0 right-0 w-6 h-4 bg-red-600 text-white text-xs flex items-center justify-center">
            {getFileType(vendorData.businessLicense) || 'FILE'}
          </div>
        )}
      </div>
    </div>
    <span className="text-sm text-gray-600">
      {vendorData.businessLicense
        ? `View ${getFileType(vendorData.businessLicense) || 'Document'}`
        : 'No document uploaded'}
    </span>
  </div>
</div>

        </div>
      </BaseModal>
      
      {/* Approve Vendor Modal */}
      <ApproveVendorModal 
        vendor={vendorData}
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleFinalApprove}
        isLoading={isApproving}
      />
      
      {/* Reject Vendor Modal */}
      <RejectVendorModal 
        vendor={vendorData}
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleFinalReject}
        isLoading={isRejecting}
      />
    </>
  );
};

export default VendorDetailsModal;
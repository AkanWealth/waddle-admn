import React, { useState, useEffect } from 'react';
// import BaseModal from '../../Element/BaseModal';
import BaseModal from '@/app/component/Element/BaseModal';
import DeleteGuardianModal from './DeleteGuardian';
// import ApproveVendorModal from './approveVendorModal';
// import RejectVendorModal from './RejectVendorModal';

/**
 * GuardianDetailsModal Component
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Guardian data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onApprove - Function to handle guardian approval
 * @param {function} props.onReject - Function to handle guardian rejection
 */
const GuardianDetailsModal = ({ 
  vendor = null, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}) => {
  // State for modals
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
  // Mock data for demonstration
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
  
  // Ensure contactDetails exists to prevent errors
  const contactDetails = vendorData?.contactDetails || {
    phone: "+4498274774",
      email: "aurajean@cheffood.com",
      address: "362 Sycamore St, Detroit, MI",
      website: "www.elitedancers.com"
  };
  
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
    // Close details modal
    onClose();
    // Open approve modal
    setIsApproveModalOpen(true);
  };
  
  // Handle reject button click - opens reject modal
  const handleRejectClick = () => {
    // Close details modal
    onClose();
    // Open reject modal
    setIsRejectModalOpen(true);
  };
  
  // Handle final approval from the approve modal
  const handleFinalApprove = () => {
    if (onApprove) onApprove(vendorData.id);
    setIsApproveModalOpen(false);
  };
  
  // Handle final rejection from the reject modal
  const handleFinalReject = (id, reason) => {
    if (onReject) onReject(id, reason);
    setIsRejectModalOpen(false);
  };
  
  // Action buttons configuration
  const modalActions = {
    reject: {
      label: "Delete",
      onClick: handleApproveClick,
      className: isMobile ? 
        "w-full border border-red-500 text-white py-2 px-6 rounded-lg bg-red-500 font-medium text-center" :
        "w-full md:w-auto border border-red-500 text-white bg-red-500 py-2 px-6 rounded-lg font-medium text-center"
    },
    approve: {
      label: "Cancel",
      onClick: handleRejectClick,
      className: isMobile ?
        "w-full text-blue-600  border border-blue-600 py-2 px-6 rounded-lg font-medium text-center" :
        "w-full md:w-auto text-blue-600  border border-blue-600  py-2 px-6 rounded-lg font-medium text-center"
    }
  };

  // Render contact details item
  const renderContactItem = (icon, value) => {
    if (!value) return null;
    
    return (
      <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
        {icon}
        {value}
      </div>
    );
  };

  // Contact detail icons
  const icons = {
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  };

  // Common content for both mobile and desktop
  const renderGuardianContent = () => (
    <>
      <hr className="border-gray-200 mb-6" />
    
      {/* Guardian Name and Related Info */}
      <div className="s-3">
        <h3 className="text-lg font-medium">{vendorData?.name || 'Guardian Name'}</h3>
        <p>Guardian to Sarah Harris.</p>
      </div>
      
      <hr className="border-gray-200 mb-6" />
      
      {/* Contact Details */}
      <div className="flexmb-6">
        <h4 className="text-gray-700 mb-3">Contact Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {renderContactItem(icons.phone, contactDetails.phone)}
  {renderContactItem(icons.email, contactDetails.email)}
  {renderContactItem(icons.address, contactDetails.address)}
  {renderContactItem(icons.website, contactDetails.website)}
</div>
      </div>
    </>
  );

  // Mobile view layout
  if (isMobile) {
    return (
      <>
        <BaseModal
          isOpen={isOpen}
          onClose={onClose}
          title="Guardian's Profile"
          size={{ width: "99%", maxWidth: "99%" }}
          className="m-0 rounded-none max-h-full h-full"
          buttonPlacement="bottom"
          showDividers={false}
        >
          <div className="flex flex-col h-full">
               {/* Guardian Content */}
            {renderGuardianContent()}
            {/* Buttons at the top for mobile */}
            <div className="flex flex-col w-full space-y-3 mb-6 mt-6">
              <button
                onClick={modalActions.reject.onClick}
                className={modalActions.reject.className}
              >
                {modalActions.reject.label}
              </button>
              <button
                onClick={modalActions.approve.onClick}
                className={modalActions.approve.className}
              >
                {modalActions.approve.label}
              </button>
            </div>
            
            <hr className="border-gray-200 mb-6" />
            
         
          </div>
        </BaseModal>
        
        {/* Delete Guardian Modal */}
        <DeleteGuardianModal 
          vendor={vendorData}
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          onConfirm={handleFinalApprove}
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
        title="Guardian's Profile"
        actions={modalActions}
        showDividers={false}
        buttonPlacement="bottom"
        size={{ width: "80%", maxWidth: "750px" }}
      >
        <div className="space-y-6">
          {/* Guardian Content */}
          {renderGuardianContent()}
        </div>
      </BaseModal>
      
      {/* Delete Guardian Modal */}
      <DeleteGuardianModal 
        vendor={vendorData}
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleFinalApprove}
      />
    </>
  );
};

export default GuardianDetailsModal;
import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import DeleteGuardianModal from './DeleteGuardian';
import { Home,Phone,Mail, User, Calendar } from 'lucide-react';

/**
 * GuardianDetailsModal Component
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Guardian data from API
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onDelete - Function to handle guardian deletion (optional callback after successful delete)
 */
const GuardianDetailsModal = ({ 
  vendor = null, 
  isOpen, 
  onClose, 
  onDelete
}) => {
  // State for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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
  
  // Handle delete button click - opens delete modal
  const handleDeleteClick = () => {
    onClose();
    setIsDeleteModalOpen(true);
  };
  
  // Handle cancel button click
  const handleCancelClick = () => {
    onClose();
  };
  
  // Handle successful deletion from the delete modal
  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    // Call the optional onDelete callback if provided
    if (onDelete) onDelete(vendor?.id);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Action buttons configuration
  const modalActions = {
    reject: {
      label: "Delete",
      onClick: handleDeleteClick,
      className: isMobile ? 
        "w-full border border-red-500 text-white py-2 px-6 rounded-lg bg-red-500 font-medium text-center" :
        "w-full md:w-auto border border-red-500 text-white bg-red-500 py-2 px-6 rounded-lg font-medium text-center"
    },
    approve: {
      label: "Cancel",
      onClick: handleCancelClick,
      className: isMobile ?
        "w-full text-blue-600 border border-blue-600 py-2 px-6 rounded-lg font-medium text-center" :
        "w-full md:w-auto text-blue-600 border border-blue-600 py-2 px-6 rounded-lg font-medium text-center"
    }
  };

  // Render contact details item
  const renderContactItem = (icon, label, value) => {
    if (!value || value === 'N/A') return null;
    
    return (
      <div className="bg-amber-100 rounded-full px-3 py-2 flex items-center">
        {icon}
        <div className="flex flex-col">
          <span className="text-xs text-gray-600">{label}</span>
          <span className="text-sm">{value}</span>
        </div>
      </div>
    );
  };

  // Contact detail icons
  const icons = {
    phone: (
      <Phone  className="h-5 w-5 mr-2" />
        
    ),
    email: (
      <Mail className="h-5 w-5 mr-2" />
        
    ),
    calendar: (
      <Calendar className="h-5 w-5 mr-2"/>
        
    ),
    user: (
      <User  className="h-5 w-5 mr-2" />
        
    ),
    address: (
      <Home className="h-5 w-5 mr-2" />
        
    )

  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Common content for both mobile and desktop
  const renderGuardianContent = () => (
    <>
      <hr className="border-gray-200 mb-6" />
    
      {/* Guardian Profile Picture and Basic Info */}
      <div className="flex items-center mb-6">
        {vendor?.profile_picture && vendor.profile_picture !== "https://waddleapp-bucket.s3.eu-north-1.amazonaws.com/users/null" ? (
          <img 
            src={vendor.profile_picture} 
            alt={vendor?.name || 'Guardian'} 
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-lg font-medium">{vendor?.name || 'Guardian Name'}</h3>
          <div className="flex items-center mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor?.status)}`}>
              {vendor?.status || 'Unknown'}
            </span>
            {vendor?.guardian_type && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {vendor.guardian_type}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <hr className="border-gray-200 mb-6" />
      
      {/* Guardian Details */}
      <div className="space-y-4 mb-6">
        <h4 className="text-gray-700 font-medium">Guardian Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {renderContactItem(icons.user, "Guardian ID", vendor?.id)}
          {renderContactItem(icons.phone, "Phone", vendor?.mobile)}
          {renderContactItem(icons.email, "Email", vendor?.email)}
          {renderContactItem(icons.address, "Address", vendor?.address)}
          {renderContactItem(icons.calendar, "Registration Date", formatDate(vendor?.date))}
        </div>
      </div>
    </>
  );

  // Don't render if no vendor data
  if (!vendor) {
    return null;
  }

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
            
            {/* Buttons at the bottom for mobile */}
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
          </div>
        </BaseModal>
        
        {/* Delete Guardian Modal */}
        <DeleteGuardianModal 
          guardian={vendor}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSuccess}
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
        guardian={vendor}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteSuccess}
      />
    </>
  );
};

export default GuardianDetailsModal;
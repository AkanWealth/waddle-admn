import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import { RefreshCw } from 'lucide-react';

/**
 * ApproveadminModal Component
 * 
 * Modal to confirm admin approval matching the provided design
 * 
 * @param {Object} props
 * @param {Object} props.admin - admin data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle confirmation
 */
const ResendInivteModal = ({ 
  admin = null, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // Mock data for demonstration
  const mockadminData = {
    id: "v12345",
    name: "Elite Dancer School"
  };
  
  // If no admin is passed, use the mock data
  const adminData = admin || mockadminData;
  
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
  
  // Handle confirmation
  const handleConfirm = () => {
    if (onConfirm) onConfirm(adminData.id);
    onClose();
  };
  
  // Action buttons configuration - set to fill width
  const modalActions = {
    approve: {
      label: "Resend Invite",
      onClick: handleConfirm,
      className: "bg-blue-600 text-white py-2 px-6 rounded-lg font-medium flex-1"
    },
    cancel: {
      label: "Cancel",
      onClick: onClose,
      className: "border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium flex-1"
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Resend Admin Invitation"
      actions={modalActions}
      buttonPlacement="bottom"
      size={{ width: isMobile ? "95%" : "500px", maxWidth: isMobile ? "95%" : "500px" }}
      className={`${isMobile ? "m-2 rounded-lg" : ""} w-full`}
      showDividers={false}
      // Set a specific height for mobile
      mobileHeight={isMobile ? "400px" : "auto"}
    >
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Green checkmark icon in circle */}
       <div className='flex flex-col-2 gap-2 items-center justify-center'>
        <div className="bg-orange-100 rounded-full p-3 mb-6">
          <RefreshCw className="h-10 w-10 text-orange-500" />
        </div>
        
        {/* Message text (centered for both mobile and desktop) */}
        <div className="text-left">
          <p className="text-gray-700">
            
            You are about to resend an invitation email to {adminData.name} ({adminData.name}@gmail.com). This will allow them to activate their account.
          </p>
        </div>
        </div> 
      </div>
    </BaseModal>
  );
};

export default ResendInivteModal;
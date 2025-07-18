import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import { StopCircle, LucideInfo } from 'lucide-react';

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
const ActivateAdmineModal = ({ 
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
      label: "Activate Admin",
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
      title="Reactivate Admin Access"
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
        <div className="bg-green-100 rounded-full p-3 mb-6">
          <StopCircle className="h-10 w-10 text-green-500" />
        </div>
        
        {/* Message text (centered for both mobile and desktop) */}
        <div className="text-left">
          <p className="text-gray-700">
            You are about to reactivate {adminData.name} . This will restore their access to the platform and allow them to resume admin activities.
          </p>
        </div>
        </div> 
        <div className="flex items-center justify-between flex-cols-2 text-center gap-2">
            
           <LucideInfo className="h-6 w-6 text-red-500 mb-2" />
            <p className="text-gray-500  text-left text-sm mt-2">
              Once reactivated, they will be able to log in and perform actions as before.
            </p>
      </div>
      </div>
    </BaseModal>
  );
};

export default ActivateAdmineModal;
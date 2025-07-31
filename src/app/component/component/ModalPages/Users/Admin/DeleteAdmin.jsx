import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';

import { XCircle,LucideInfo } from 'lucide-react';
import { useToastContext } from '@/context/toast';
import { authService } from '@/utils/authService';
/**
 * DeleteadminModal Component
 * 
 * @param {Object} props
 * @param {Object} props.admin - admin data with id
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle successful deletion
 */
const DeleteAdminModal = ({ 
  admin = null, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // State for loading and error handling
  const [isDeleting, setIsDeleting] = useState(false);
  const { showMessage } = useToastContext();
  
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

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsDeleting(false);
    }
  }, [isOpen]);
  
 

  // Handle cancel
  const handleCancel = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  const modalActions = {
    approve: {
      label: isDeleting ? "Deleting..." : "Delete Admin",
      onClick: onConfirm,
      className: `${
        isDeleting 
          ? "bg-red-400 cursor-not-allowed" 
          : "bg-red-600 hover:bg-red-700"
      } text-white py-3 px-4 rounded-lg text-sm font-medium text-center flex-1 transition-colors`,
      disabled: isDeleting
    },
    cancel: {
      label: "Cancel",
      onClick: handleCancel,
      className: `border border-gray-300 text-gray-700 py-2 px-4 text-sm rounded-lg font-medium flex-1 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      } transition-colors`,
      disabled: isDeleting
    }
  };
  
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      actions={modalActions}
      buttonPlacement="bottom"
      size={{ 
        width: isMobile ? "95%" : "500px", 
        maxWidth: isMobile ? "95%" : "500px" 
      }}
      className={`${isMobile ? "m-2 rounded-lg" : ""} w-full`}
      showDividers={false}
      mobileHeight={isMobile ? "400px" : "auto"}
    >
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Red X icon in circle */}
        <div className='flex flex-col-2 gap-8 items-center justify-center'>
          <div className="bg-red-100 rounded-full p-3 mb-6">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>

          {/* Message text */}
          <div className="text-left">
            <h3 className='text-gray-800 font-bold text-xl'>Delete Admin</h3>
            <p className="text-gray-700 text-lg">
              Are you sure you want to permanently delete 
              admin This action cannot be undone, and all their access will be revoked. 
            </p>
            
              <p className="text-gray-600 text-sm mt-2">
                
              </p>
            <p className="text-gray-500 text-sm mt-2">
              
            </p>
          </div>


        </div>
        <div className="flex items-center justify-between flex-cols-2 text-center gap-2">
            
           <LucideInfo className="h-6 w-6 text-red-500 mb-2" />
            <p className="text-gray-500  text-left text-sm mt-2">
              Deleting an admin will remove their access completely. If they need access again, they will need to be reinvited
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default DeleteAdminModal;
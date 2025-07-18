import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import { XCircle } from 'lucide-react';
import { useToastContext } from '@/context/toast';
import { authService } from '@/utils/authService';
/**
 * DeleteGuardianModal Component
 * 
 * @param {Object} props
 * @param {Object} props.guardian - Guardian data with id
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle successful deletion
 */
const DeleteGuardianModal = ({ 
  guardian = null, 
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
  
  // Handle delete confirmation with API call
  const handleConfirm = async () => {
    if (!guardian?.id) {
      showMessage("Error", "Guardian ID is missing", "error");
      return;
    }

    setIsDeleting(true);
    
    try {
      // Make API call to delete guardian
      await authService.makeAuthenticatedRequest(
        `/api/v1/users/${guardian.id}`, 
        {
          method: 'DELETE'
        }
      );
      
      // Show success message
      showMessage(
        "Account Deleted", 
        "The guardian account was deleted successfully.", 
        "success"
      );
      
      // Close modal and trigger success callback
      onClose();
      if (onConfirm) onConfirm();
      
    } catch (error) {
      console.error('Delete guardian error:', error);
      
      // Show error message
      showMessage(
        "Delete Failed", 
        error.message || "Failed to delete guardian account. Please try again.", 
        "error"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  const modalActions = {
    approve: {
      label: isDeleting ? "Deleting..." : "Delete Account",
      onClick: handleConfirm,
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
            <h3 className='text-gray-800 font-bold text-xl'>Delete Account</h3>
            <p className="text-gray-700 text-lg">
              You are about to delete this guardian account. 
            </p>
            {guardian?.name && (
              <p className="text-gray-600 text-sm mt-2">
                Guardian: <span className="font-medium">{guardian.name}</span>
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteGuardianModal;
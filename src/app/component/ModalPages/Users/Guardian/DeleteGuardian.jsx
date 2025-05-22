import React, { useState, useEffect } from 'react';
import BaseModal from '@/app/component/Element/BaseModal';
import { XCircle } from 'lucide-react';
import { useToastContext } from '@/context/toast';
// import { XCircle } from 'lucide-react';

/**
 * RejecteventModal Component
 * 
 * @param {Object} props
 * @param {Object} props.event - event data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle event rejection confirmation
 */
const DeleteGuardianModal = ({ 
  event = null, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // State for rejection reason
  const [rejectionReason, setRejectionReason] = useState('');
  const { showMessage } = useToastContext();
  // Validation error state
  const [error, setError] = useState(false);
  
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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setRejectionReason('');
      setError(false);
    }
  }, [isOpen]);
  
  // Handle confirmation
   const handleConfirm = () => {
    onClose();
    showMessage("Account Deleted", "The guardian account was deleted successfully.", "success"); // <-- Show toast
    if (onConfirm) onConfirm(event?.id);
  };

const modalActions = {
    approve: {
      label: " Delete Account",
      onClick: handleConfirm,
      className: "bg-red-600 text-white py-3 px-4 rounded-lg text-sm font-medium text-center flex-1"
    },
    cancel: {
      label: "Cancel",
      onClick: onClose,
      className: "border border-gray-300 text-gray-700 py-2 px-4 text-sm rounded-lg font-medium flex-1"
    }
  };

  // Handle reject button click
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      setError(true);
      return;
    }
    
    if (onConfirm) {
      onConfirm(event?.id, rejectionReason);
    }
    onClose();
  };
  
  return (
    <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            // title="Enable Vendor"
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
                <div className='flex flex-col-2 gap-8 items-center justify-center'>
                    <div className="bg-red-100 rounded-full p-3 mb-6">
                        <XCircle className="h-6 w-6 text-red-500" />
                    </div>

                    {/* Message text (centered for both mobile and desktop) */}
                    <div className="text-left">
                        <h3 className='text-gray-800 font-bold text-xl'>Delete Account</h3>
                        <p className="text-gray-700 text-lg">
                            You are about to delete this account. 
                        </p>
                    </div>
                </div>
            </div>
        </BaseModal>
  );
};
export default DeleteGuardianModal;
import React, { useState, useEffect } from 'react';
import BaseModal from '../../Element/BaseModal';
// import { XCircle } from 'lucide-react';
import { Trash2 } from 'lucide-react';

/**
 * RejecteventModal Component
 * 
 * @param {Object} props
 * @param {Object} props.event - event data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle event rejection confirmation
 */
const DeleteEventModal = ({ 
  event = null, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // State for rejection reason
  const [rejectionReason, setRejectionReason] = useState('');
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
     if (onConfirm) onConfirm(event.id);
    onClose();
  };

const modalActions = {
    approve: {
      label: " Delete Event",
      onClick: handleConfirm,
      className: "bg-red-600 text-white py-3 px-4 rounded-lg text-sm font-medium text-center flex-1"
    },
    cancel: {
      label: "Keep Event",
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
                <div className='flex flex-col-2 gap-2 items-center justify-center'>
                    <div className="bg-red-100 rounded-full p-3 mb-6">
                        <Trash2 className="h-10 w-10 text-red-500" />
                    </div>

                    {/* Message text (centered for both mobile and desktop) */}
                    <div className="text-left">
                        <h3 className='text-gray-800 font-bold text-lg'>Are you sure you want to delete this event?</h3>
                        <p className="text-gray-700">
                            Deleting this event will notify all registered parents and remove it from the event listing. 
This action is irreversible.
                        </p>
                    </div>
                </div>
            </div>
        </BaseModal>
  );
};

export default DeleteEventModal;
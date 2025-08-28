import React, { useState, useEffect } from 'react';
import BaseModal from '../../Element/BaseModal';
import { PauseCircle } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

/**
 * SuspendVendorModal Component
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Vendor data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle vendor suspension confirmation
 */
const SuspendVendorModal = ({ 
  vendor = null, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // State for suspension reason
  const [suspensionReason, setSuspensionReason] = useState('');
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
      setSuspensionReason('');
      setError(false);
    }
  }, [isOpen]);
  
  // Handle confirmation
  const handleConfirm = () => {
    if (!suspensionReason.trim()) {
      setError(true);
      return;
    }
    
    if (onConfirm) {
      onConfirm(vendor?.id, suspensionReason);
    }
    onClose();
  };

  const modalActions = {
    suspend: {
      label: "Suspend Vendor",
      onClick: handleConfirm,
      className: "bg-[#CC0000] text-white py-3 px-4 rounded-lg text-sm font-medium text-center flex-1"
    },
    cancel: {
      label: "Cancel",
      onClick: onClose,
      className: "border border-[#2853A6] text-[#2853A6] py-2 px-4 text-sm rounded-lg font-medium flex-1"
    }
  };
  
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isMobile ? "" : "Suspend Account?"}
      actions={modalActions}
      size={{ width: isMobile ? "100%" : "500px", maxWidth: isMobile ? "100%" : "500px" }}
      className={isMobile ? "m-0 rounded-none h-full" : ""}
      showDividers={false}
    >
      <ToastContainer/>
      <div className="flex flex-col">
        {/* Icon and Title */}
        <div className="flex flex-col-2 gap-2 items-center mb-4">
          <div className="bg-[#F6AAA8] rounded-full p-4 mb-4">
            <PauseCircle className="h-6 w-6 text-[#CC0000]" />
          </div>
          <p className="text-gray-700 mb-6">
            You are about to suspend {vendor?.name || 'this vendor'}. Their account will be temporarily disabled and they will be notified with your reason for suspension.
          </p>
        </div>
        
        {/* Suspension reason input */}
        <div className="mb-2">
          <label className="block mb-2 font-bold text-gray-700">
            Provide a reason for suspension <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300`}
            placeholder="e.g., Violation of platform guidelines"
            value={suspensionReason}
            onChange={(e) => {
              setSuspensionReason(e.target.value);
              if (e.target.value.trim()) setError(false);
            }}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">Please provide a reason for suspension</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default SuspendVendorModal;
import React, { useState, useEffect } from 'react';
import BaseModal from '../../Element/BaseModal';
import { BadgeCheck } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

/**
 * ApproveVendorModal Component
 * 
 * Modal to confirm vendor approval matching the provided design
 * 
 * @param {Object} props
 * @param {Object} props.vendor - Vendor data
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onConfirm - Function to handle confirmation
 */
const EnableVendorModal = ({
    vendor = null,
    isOpen,
    onClose,
    onConfirm
}) => {
    // Mock data for demonstration
    const mockVendorData = {
        id: "v12345",
        name: "Elite Dancer School"
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

    // Handle confirmation
    const handleConfirm = () => {
        if (onConfirm) onConfirm(vendorData.id);
        onClose();
    };

    // Action buttons configuration - set to fill width
    const modalActions = {
        approve: {
            label: "Enable Vendor",
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
            title="Enable Vendor"
            actions={modalActions}
            buttonPlacement="bottom"
            size={{ width: isMobile ? "95%" : "500px", maxWidth: isMobile ? "95%" : "500px" }}
            className={`${isMobile ? "m-2 rounded-lg" : ""} w-full`}
            showDividers={false}
            // Set a specific height for mobile
            mobileHeight={isMobile ? "400px" : "auto"}
        >
            <ToastContainer/>
            <div className="flex flex-col items-center justify-center mb-6">
                {/* Green checkmark icon in circle */}
                <div className='flex flex-col-2 gap-2 items-center justify-center'>
                    <div className="bg-green-100 rounded-full p-3 mb-6">
                        <BadgeCheck className="h-10 w-10 text-green-500" />
                    </div>

                    {/* Message text (centered for both mobile and desktop) */}
                    <div className="text-left">
                        <p className="text-gray-700">

                            Do you want to re-enable this organizer’s account?

                        </p>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

export default EnableVendorModal;
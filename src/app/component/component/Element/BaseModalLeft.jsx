import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * SideModal - A reusable modal component that slides in from the side
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Function to call when modal closes
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {Object} props.actions - Object containing action buttons configuration
 * @param {string} props.position - Position of the modal ('left' or 'right')
 * @param {string} props.width - Width of the modal
 * @param {boolean} props.closeOnBackdropClick - Whether clicking the backdrop closes the modal
 * @param {string} props.className - Additional classes for the modal
 * @param {boolean} props.showHeader - Whether to show the header with title and close button
 * @param {boolean} props.showDividers - Whether to show dividers
 * @param {string} props.buttonPlacement - Where to place action buttons ('bottom' or 'top')
 */
const SideModal = ({
    isOpen,
    onClose,
    title,
    children,
    actions,
    position = 'right', // 'left' or 'right'
    width = '480px',
    closeOnBackdropClick = true,
    className = "",
    showHeader = true,
    showDividers = true,
    buttonPlacement = "bottom"
}) => {
    // Handle escape key to close modal
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const renderActionButtons = () => {
        if (!actions) return null;
        
        return (
            <div className={`w-full flex flex-col md:flex-row gap-3 ${buttonPlacement === "bottom" ? "mt-6 mb-2" : "mb-6"}`}>
                {Object.keys(actions).map((key) => (
                    <button
                        key={key}
                        onClick={actions[key].onClick}
                        className={actions[key].className}
                    >
                        {actions[key].label}
                    </button>
                ))}
            </div>
        );
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex z-[1000] overflow-hidden"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`fixed inset-y-0 bg-white shadow-xl overflow-y-auto ${position === 'left' ? 'left-0' : 'right-0'} ${className}`}
                style={{
                    width: width,
                    maxWidth: '100vw',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateX(0)' : `translateX(${position === 'left' ? '-100%' : '100%'})`,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    {/* Header with title and close button */}
                    {showHeader && (
                        <div className="flex items-center justify-between p-4 md:p-6">
                            <div className="flex items-center">
                                <button
                                    className="mr-2 p-1 rounded-full hover:bg-gray-100"
                                    onClick={onClose}
                                    aria-label="Back"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                {title && <h2 className="text-xl font-medium">{title}</h2>}
                            </div>
                            <button
                                className="text-2xl text-gray-500 hover:text-gray-700 p-1"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    {showDividers && <hr className="border-gray-200" />}

                    {/* Modal content */}
                    <div className="flex-grow overflow-y-auto p-4 md:p-6">
                        {buttonPlacement === "top" && renderActionButtons()}
                        <div>{children}</div>
                    </div>

                    {/* Footer with action buttons */}
                    {buttonPlacement === "bottom" && (
                        <div className="p-4 md:p-6">
                            {showDividers && <hr className="border-gray-200 mb-4" />}
                            {renderActionButtons()}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SideModal;
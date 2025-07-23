import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * BaseModal - A reusable modal component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Function to call when modal closes
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {Object} props.actions - Object containing action buttons configuration
 * @param {Object} props.size - Object containing size configuration (width, maxWidth)
 * @param {boolean} props.closeOnBackdropClick - Whether clicking the backdrop closes the modal
 * @param {string} props.className - Additional classes for the modal
 */
const BaseModal = ({
    isOpen,
    onClose,
    title,
    children,
    actions,
    buttonPlacement = "bottom",
    size = {
        width: "80%",
        maxWidth: "750px"
    },
    closeOnBackdropClick = true,
    
    className = "",
    showDividers = true,
    description,


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
            <div className={`w-full flex flex-col justify-end md:flex-row gap-3 mb-4 ${buttonPlacement === "bottom" ? "mt-6 mb-6 justify-center" : ""}`}>
                {Object.keys(actions).map((key) => (
                    <button
                        key={key}
                        onClick={actions[key].onClick}
                        className={actions[key].className}
                        disabled={actions[key].disabled}
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
            className="fixed inset-0 modal-backdrop flex justify-center items-center z-[1000] overflow-auto p-0"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`bg-white rounded-none md:rounded-xl p-4 md:p-8 ${className}`}
                style={{
                    width: size.width,
                    maxWidth: size.maxWidth,
                    maxHeight: window.innerWidth < 768 ? "100vh" : "85vh",
                    marginTop: window.innerWidth < 768 ? "32px" : "0",
                    marginBottom: window.innerWidth < 768 ? "0" : "0",
                    height: window.innerWidth < 768 ? "calc(100vh - 32px)" : "auto",
                    overflow: "auto"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <div className="float-right">
                    <button
                        className="text-2xl text-gray-700"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal title */}
                {title && (
                    <h2 className="text-xl font-medium mb-4 mt-2">{title}</h2>
                )}
{description && (
                    <p className="my-4 text-gray-600 mb-6">{description}</p>
                )}
          {showDividers && <hr className="border-gray-300 mb-6" />}

                {buttonPlacement === "top-left" && renderActionButtons()}
 {showDividers && <hr className="border-gray-300 mb-6" />}


                {/* Modal content */}
                <div className="clear-both">
                    {children}
                </div>

                                {/* Render action buttons at bottom if specified */}
                {buttonPlacement === "bottom" && renderActionButtons()}
                
                {showDividers && buttonPlacement === "bottom" && <hr className="border-gray-300 mt-6" />}

            </div>
        </div>,
        document.body
    );
};

export default BaseModal;
import React, { useState } from 'react';
import { CircleCheck, XCircle, Clock } from "lucide-react";
import BaseModal from '../../Element/BaseModal';
import { useToastContext } from '@/context/toast';
import { notificationService } from '@/utils/notificationService';

const NotificationModalContent = ({ 
    notification, 
    onSendNotification, 
    cancellationReason, 
    setCancellationReason 
}) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case "Notified":
                return <CircleCheck className="w-4 h-4 text-green-600" />;
            case "Not Notified":
                return <XCircle className="w-4 h-4 text-red-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const renderNotNotifiedContent = () => (
        <div className="space-y-6">
            {/* Status Badge - Top Right */}
            <div className="flex justify-end">
                <div className="flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Not Notified
                </div>
            </div>

            {/* Title */}
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Notify Parents - {notification.eventName} Cancellation
                </h2>
                <div className="w-full h-px bg-gray-200 mt-4"></div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <span className="text-gray-600 block mb-1">Event:</span>
                        <p className="font-medium text-gray-900">{notification.eventName}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Organizer:</span>
                        <p className="font-medium text-gray-900">{notification.organizer}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Date:</span>
                        <p className="font-medium text-gray-900">{notification.date}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Booked Users:</span>
                        <p className="font-medium text-gray-900">{notification.bookedUsers}</p>
                    </div>
                </div>
            </div>

            {/* Cancellation Notice */}
            <div className="text-center py-4">
                <p className="text-gray-700 text-base leading-relaxed">
                    The event <strong>{notification.eventName}</strong> has been canceled. 
                    Parents who booked this event need to be notified about the cancellation.
                </p>
            </div>

            {/* Warning Alert */}
            <div className="flex items-start bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0">
                    ⚠️
                </div>
                <p className="text-orange-800 text-sm">
                    All parents who booked this event will receive a notification via email and in-app alert
                </p>
            </div>

            {/* Cancellation Reason */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-900">
                    Cancellation Reason (Optional)
                </label>
                <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    placeholder="Enter a message that will be sent to parents about the event cancellation"
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={4}
                />
            </div>
        </div>
    );

    const renderNotifiedContent = () => (
        <div className="space-y-6">
            {/* Status Badge - Top Right */}
            <div className="flex justify-end">
                <div className="flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                    <CircleCheck className="w-4 h-4 mr-1.5" />
                    Notified
                </div>
            </div>

            {/* Title */}
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Event Details - {notification.eventName}
                </h2>
                <div className="w-full h-px bg-gray-200 mt-4"></div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                        <span className="text-gray-600 block mb-1">Event:</span>
                        <p className="font-medium text-gray-900">{notification.eventName}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Organizer:</span>
                        <p className="font-medium text-gray-900">{notification.organizer}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Date:</span>
                        <p className="font-medium text-gray-900">{notification.date}</p>
                    </div>
                    <div>
                        <span className="text-gray-600 block mb-1">Booked Users:</span>
                        <p className="font-medium text-gray-900">{notification.bookedUsers}</p>
                    </div>
                </div>
            </div>

            {/* Success Alert */}
            <div className="flex items-start bg-green-50 border border-green-200 rounded-lg p-4">
                <CircleCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                    All parents have been successfully notified about this event cancellation.
                </p>
            </div>

            {/* Additional Event Information */}
            {notification.originalEvent && (
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Additional Event Information</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Address:</strong> {notification.originalEvent.address}</p>
                        <p><strong>Price:</strong> ${notification.originalEvent.price}</p>
                        <p><strong>Category:</strong> {notification.originalEvent.category}</p>
                        {notification.originalEvent.description && (
                            <p><strong>Description:</strong> {notification.originalEvent.description}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // Render based on status
    switch (notification.status) {
        case "Not Notified":
            return renderNotNotifiedContent();
        case "Notified":
            return renderNotifiedContent();
        default:
            return renderNotNotifiedContent();
    }
};

const NotificationModal = ({ 
    isOpen, 
    onClose, 
    notification, 
    onUpdateNotification 
}) => {
    const [cancellationReason, setCancellationReason] = useState("");
    const {showMessage}= useToastContext()

    const handleSendNotification = async() => {
        if (notification) {
            // Call the parent function to update the notification
            console.log(notification, "This is the notification")
            
            // Show success message with cancellation reason if provided
            const message = cancellationReason 
                ? `Notification sent successfully for ${notification.eventName} with cancellation reason!`
                : `Notification sent successfully for ${notification.eventName}!`;
            
            console.log("Attempting to show toast message:", message);
            
            // Test the toast system
            try {
                const response = await notificationService.notifyUsersOfEventCancellation(notification.id, cancellationReason)
                if(response.success){
                    onUpdateNotification(notification.id, "Notified");
                    showMessage("Success", message, "success");
                }else{
                    showMessage("Failed", `Failed to send notification for ${notification.eventName}`, "error")
                }
                
                console.log("Toast message function called successfully");
            } catch (error) {
                showMessage("Error", `Error occured while trying to send notification for ${notification.eventName}`, "error")
                console.error("Error showing toast message:", error);
            }
            
            setCancellationReason("");
            onClose();
        }
    };

    const getModalActions = (notification) => {
        if (!notification) return {};

        const actions = {
            cancel: {
                label: "Close",
                onClick: onClose,
                className: "px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            }
        };

        // Add Send Notification button for "Not Notified" status
        if (notification.status === "Not Notified") {
            actions.sendNotification = {
                label: "Send Notification Now",
                onClick: handleSendNotification,
                className: "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            };
        }

        return actions;
    };

    if (!notification) return null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            actions={getModalActions(notification)}
            size={{ width: "90%", maxWidth: "600px" }}
            showDividers={false}
        >
            <div className="p-6">
                <NotificationModalContent 
                    notification={notification}
                    onSendNotification={handleSendNotification}
                    cancellationReason={cancellationReason}
                    setCancellationReason={setCancellationReason}
                />
            </div>
        </BaseModal>
    );
};

export default NotificationModal;
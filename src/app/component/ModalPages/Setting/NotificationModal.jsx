import React, { useState } from 'react';
import { CircleCheck, XCircle, Clock } from "lucide-react";
import BaseModal from '../../Element/BaseModal';

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
            case "Cancelled":
                return <XCircle className="w-4 h-4 text-red-600" />;
            case "Pending":
                return <Clock className="w-4 h-4 text-yellow-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const renderCancelledContent = () => (
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
                    Notify Parents - {notification.eventName} Cancellation
                </h2>
                <div className="w-full h-px bg-gray-200 mt-4"></div>
            </div>

            {/* Cancellation Notice */}
            <div className="text-center py-4">
                <p className="text-gray-700 text-base leading-relaxed">
                    The event <strong>{notification.eventName}</strong> scheduled for March 20, 2025, has been canceled 
                    by the organiser. If you have already booked this event, please check your email 
                    for refund details.
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
                    Cancellation Reason
                </label>
                <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    placeholder="Enter a message that would sent to parents on for event cancellation"
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    rows={4}
                />
            </div>
        </div>
    );

    const renderPendingContent = () => (
        <div className="space-y-6">
            {/* Status Badge - Top Right */}
            <div className="flex justify-end">
                <div className="flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200">
                    <Clock className="w-4 h-4 mr-1.5" />
                    Pending
                </div>
            </div>

            {/* Title */}
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Notify Parents - {notification.eventName}
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

            {/* Info Alert */}
            <div className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                    ℹ️
                </div>
                <p className="text-blue-800 text-sm">
                    All parents who booked this event will receive a notification via email and in-app alert
                </p>
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
                    All parents have been successfully notified about this event.
                </p>
            </div>
        </div>
    );

    // Render based on status
    switch (notification.status) {
        case "Cancelled":
            return renderCancelledContent();
        case "Pending":
            return renderPendingContent();
        case "Notified":
            return renderNotifiedContent();
        default:
            return renderPendingContent();
    }
};

const NotificationModal = ({ 
    isOpen, 
    onClose, 
    notification, 
    onUpdateNotification 
}) => {
    const [cancellationReason, setCancellationReason] = useState("");

    const handleSendNotification = () => {
        if (notification) {
            // Call the parent function to update the notification
            onUpdateNotification(notification.id, "Notified");
            
            // Show success message with cancellation reason if provided
            const message = cancellationReason 
                ? `Notification sent successfully for ${notification.eventName} with cancellation reason!`
                : `Notification sent successfully for ${notification.eventName}!`;
            
            alert(message);
            setCancellationReason("");
            onClose();
        }
    };

    const getModalActions = (notification) => {
        if (!notification) return {};

        const actions = {
            cancel: {
                label: "Cancel",
                onClick: onClose,
                className: "px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            }
        };

        // Add Send Notification button for Pending and Cancelled statuses
        if (notification.status === "Pending" || notification.status === "Cancelled") {
            actions.sendNotification = {
                label: "Send Notification Now",
                onClick: handleSendNotification,
                disabled: notification.status === "Cancelled" && !cancellationReason.trim(),
                className: (notification.status === "Cancelled" && !cancellationReason.trim())
                    ? "px-8 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium text-sm"
                    : "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
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
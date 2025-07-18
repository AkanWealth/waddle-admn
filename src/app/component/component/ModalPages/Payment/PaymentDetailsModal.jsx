import React, { useState } from 'react';
import BaseModal from '../../Element/BaseModal';

// Transaction Details Modal - Main modal that shows different content based on status
const TransactionDetailsModal = ({ transaction, isOpen, onClose, onRefund }) => {
    const [showRefundModal, setShowRefundModal] = useState(false);

    if (!transaction) return null;

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'successful':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'failed':
                return 'text-red-600 bg-red-100';
            case 'cancelled':
                return 'text-orange-600 bg-orange-100';
            case 'refunded':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getModalActions = () => {
        if (transaction.status?.toLowerCase() === 'cancelled') {
            return {
                refund: {
                    label: 'Confrim Refund',
                    onClick: () => setShowRefundModal(true),
                    className: 'w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                }
            };
        }
        return null;
    };

    const renderTransactionDetails = () => (
        <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex mb-6 py-2 border-t border-gray-300">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                </span>
            </div>

            {/* Transaction Info Grid */}
            <div className="grid grid-cols-1 gap-2">
                <div className="space-y-4">
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Transaction ID</label>
                        <p className="text-gray-900 font-medium">{transaction.id}</p>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">User</label>
                        <p className="text-gray-900">{transaction.userName}</p>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Event</label>
                        <p className="text-gray-900">{transaction.eventName}</p>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                        <p className="text-gray-900">{formatDate(transaction.transactionDate)}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Amount Paid</label>
                        <p className="text-gray-900 font-medium text-lg">{transaction.amount}</p>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
                        <p className="text-gray-900">Credit Card</p>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Booking ID</label>
                        <p className="text-gray-900">BK{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    </div>
                    
                    {transaction.status?.toLowerCase() === 'cancelled' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Processing Fee</label>
                            <p className="text-gray-900">£1.00</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Details for Successful Transactions */}
            {transaction.status?.toLowerCase() === 'successful' && (
                <div className="p-4  border-t border-gray-300">
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Net Amount</label>
                        <p className="text-gray-900 font-medium text-lg">{transaction.amount}</p>
                    </div>
                </div>
            )}

            {/* Additional Details for Failed Transactions */}
            {/* {transaction.status?.toLowerCase() === 'failed' && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">Payment Failed</h4>
                    <p className="text-red-700 text-sm">
                        Payment could not be processed. Please contact the user to resolve the payment issue.
                    </p>
                </div>
            )} */}

            {/* Additional Details for Pending Transactions */}
            {/* {transaction.status?.toLowerCase() === 'pending' && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">Payment Pending</h4>
                    <p className="text-yellow-700 text-sm">
                        Payment is being processed. This may take a few minutes to complete.
                    </p>
                </div>
            )} */}

            {/* Additional Details for Refunded Transactions */}
            {/* {transaction.status?.toLowerCase() === 'refunded' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Payment Refunded</h4>
                    <p className="text-blue-700 text-sm">
                        Refund has been processed and will appear in the user's account within 3-5 business days.
                    </p>
                </div>
            )} */}
        </div>
    );

    return (
        <>
            <BaseModal
                isOpen={isOpen && !showRefundModal}
                onClose={onClose}
                title="Transaction Details"
                size={{ width: "90%", maxWidth: "600px" }}
                actions={getModalActions()}
                buttonPlacement="bottom"
                showDividers={false}
            >
                {renderTransactionDetails()}
            </BaseModal>

            {/* Refund Confirmation Modal */}
            <RefundConfirmationModal
                isOpen={showRefundModal}
                onClose={() => setShowRefundModal(false)}
                transaction={transaction}
                onConfirmRefund={onRefund}
                onBackToDetails={() => setShowRefundModal(false)}
                showDividers={false}
            />
        </>
    );
};

// Refund Confirmation Modal - Shows refund details for cancelled transactions
const RefundConfirmationModal = ({ isOpen, onClose, transaction, onConfirmRefund, onBackToDetails }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmRefund = async () => {
        setIsProcessing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (onConfirmRefund) {
                await onConfirmRefund(transaction.id);
            }
            
            onClose();
        } catch (error) {
            console.error('Error processing refund:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const refundActions = {
        cancel: {
            label: 'Cancel',
            onClick: onBackToDetails,
            className: 'w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors',
            disabled: isProcessing
        },
        confirm: {
            label: isProcessing ? 'Processing...' : 'Confirm Refund',
            onClick: handleConfirmRefund,
            className: 'w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50',
            disabled: isProcessing
        }
    };

    const renderRefundDetails = () => (
        <div className="space-y-6">
            {/* Warning Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="text-red-600 mr-3 mt-1">⚠️</div>
                    <div>
                        <h4 className="font-medium text-red-800 mb-1">Cancelled</h4>
                        <p className="text-red-700 text-sm">
                            This transaction has been cancelled and is eligible for refund processing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Transaction Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Transaction Summary</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">{transaction?.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">User:</span>
                        <span className="font-medium">{transaction?.userName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Event:</span>
                        <span className="font-medium">{transaction?.eventName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">March 15, 2025 | 10:45 AM</span>
                    </div>
                </div>
            </div>

            {/* Refund Calculation */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Refund Calculation</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span>£20.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span>£1.00</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-medium text-lg">
                        <span>Net Amount:</span>
                        <span className="text-green-600">£19.00</span>
                    </div>
                </div>
            </div>

           
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Process Refund"
            description="Review the refund details below and confirm to process the refund."
            size={{ width: "90%", maxWidth: "500px" }}
            actions={refundActions}
            buttonPlacement="bottom"
            showDividers={false}
        >
            {renderRefundDetails()}
        </BaseModal>
    );
};

export default TransactionDetailsModal;
export { RefundConfirmationModal };
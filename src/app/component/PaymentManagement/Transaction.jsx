"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { paymentService } from "@/utils/paymentService";
import TransactionDetailsModal from "../ModalPages/Payment/PaymentDetailsModal";
import { formatDate, formatTime } from "../UserManagement/DeletedUsers";

/**
 * TransactionTable component for displaying payment transactions
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {string} props.searchTerm - Search term for filtering
 * @param {Array} props.statusFilter - Array of status filters
 * @param {Object} props.dateFilter - Date filter object with from and to properties
 * @param {string} props.paymentStatus - Payment status filter
 * @param {string} props.bookingStatus - Booking status filter
 * @param {boolean} props.mobileView - Whether to show mobile view
 * @param {Function} props.onPaginationUpdate - Callback for pagination updates
 */
export default function TransactionTable({ currentPage, searchTerm, statusFilter, dateFilter, paymentStatus, bookingStatus, mobileView, onPaginationUpdate }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [paginatedTransactions, setPaginatedTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
    });

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const fetchTransactions = async (page = 1, limit = 10) => {
        setLoading(true);
        setError(null);
        
        try {
            const params = {
                page,
                limit,
                ...(searchTerm && { search: searchTerm }), // Add search parameter
                ...(paymentStatus && { paymentStatus: paymentStatus.toUpperCase() }),
                ...(bookingStatus && { 
                    bookingStatus: (() => {
                        switch (bookingStatus) {
                            case "No Booking":
                                return "NO_BOOKING";
                            case "Successful":
                                return "SUCCESSFUL";
                            case "Cancelled":
                                return "CANCELLED";
                            default:
                                return bookingStatus.toUpperCase();
                        }
                    })()
                }),
                ...(dateFilter.from && { startDate: dateFilter.from }),
                ...(dateFilter.to && { endDate: dateFilter.to })
            };

            // Debug logging
            console.log('Fetching transactions with params:', params);

            const response = await paymentService.getAllPayments(params);
            
            if (response.success) {
                // Transform API data to match our component structure
                const transformedData = response.data.data.map(payment => {
                    // Map booking status according to requirements
                    let bookingStatus = 'No Booking';
                    if (payment.booking?.status) {
                        switch (payment.booking.status.toLowerCase()) {
                            case 'confirmed':
                                bookingStatus = 'Successful';
                                break;
                            case 'cancelled':
                                bookingStatus = 'Cancelled';
                                break;
                            case 'pending':
                            case 'failed':
                            default:
                                bookingStatus = 'No Booking';
                                break;
                        }
                    }

                    
                    return {
                        id: payment.id,
                        transactionId: payment.transactionId,
                        userName: payment.username || payment.user?.name || 'N/A',
                        userEmail: payment.user?.email || 'N/A',
                        eventName: payment.eventName || payment.event?.name || 'N/A',
                        amount: `£${payment.amount}`,
                        paymentStatus: payment.status,
                        bookingStatus: bookingStatus,
                        date: new Date(payment.createdAt).toISOString().split('T')[0],
                        transactionDate: payment.createdAt,
                        // Additional fields from API
                        bookingId: payment.bookingId,
                        eventId: payment.eventId,
                        method: payment.method,
                        processingFee: payment.processingFee,
                        netAmount: payment.netAmount,
                        amountPaid: payment.amountPaid,
                        refundId: payment.refundId,
                        refundStatus: payment.refundStatus,
                        user: payment.user,
                        event: payment.event,
                        booking: payment.booking
                    };
                });

                setAllTransactions(transformedData);
                setPagination(response.data.pagination);
                
                // Call the pagination callback to update parent component
                if (onPaginationUpdate) {
                    onPaginationUpdate(response.data.pagination);
                }
            } else {
                setError(response.error || 'Failed to fetch transactions');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount and when filters change
    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage, searchTerm, statusFilter, dateFilter, paymentStatus, bookingStatus]);

    // Apply client-side filters only (search is now handled server-side)
    useEffect(() => {
        let results = [...allTransactions];

        // Apply client-side payment status filter (if not already filtered by API)
        if (paymentStatus && !statusFilter.includes(paymentStatus.toUpperCase())) {
            results = results.filter(
                transaction => transaction.paymentStatus.toLowerCase() === paymentStatus.toLowerCase()
            );
        }

        // Apply client-side booking status filter (if not already filtered by API)
        if (bookingStatus && !statusFilter.includes(bookingStatus.toUpperCase())) {
            results = results.filter(
                transaction => transaction.bookingStatus.toLowerCase() === bookingStatus.toLowerCase()
            );
        }

        setFilteredTransactions(results);
    }, [allTransactions, paymentStatus, bookingStatus, statusFilter]);

    // Pagination logic - use API pagination instead of client-side
    useEffect(() => {
        setPaginatedTransactions(filteredTransactions);
    }, [filteredTransactions]);

    // Function to open transaction details
    const openTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    // Function to handle refund processing
    const handleRefund = async (transactionId) => {
        try {
            // Update transaction status to refunded
            setAllTransactions(prev => 
                prev.map(transaction =>
                    transaction.id === transactionId 
                        ? { ...transaction, paymentStatus: "REFUNDED", bookingStatus: "Cancelled" }
                        : transaction
                )
            );
            
            console.log(`Transaction ${transactionId} refunded successfully`);
            setIsModalOpen(false);
            
        } catch (error) {
            console.error('Error processing refund:', error);
            setError(`Failed to process refund: ${error.message}`);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading transactions...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-8">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={() => fetchTransactions(currentPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Render mobile view as a simplified table
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedTransactions.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">Transaction</th>
                                    <th className="pb-3 px-2 font-medium text-center">Payment</th>
                                    <th className="pb-3 px-2 font-medium text-center">Booking</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedTransactions.map((transaction, index) => (
                                    <tr key={`${transaction.id}-${index}`} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">
                                            <div>
                                                <div className="font-medium">{transaction.id}</div>
                                                <div className="text-gray-500 text-xs">{transaction.userName}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={transaction.paymentStatus} />
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={transaction.bookingStatus} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <button
                                                onClick={() => openTransactionDetails(transaction)}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center py-8">
                                    <img src="/transaction.png" alt="No Transactions" className="w-auto h-auto mx-auto mb-4" />
                                    <div className="text-gray-800 font-semibold mb-2">No Transaction History Yet</div>
                                    <div className="text-gray-500 text-sm">
                                        Events payment and refunds will appear here once transactions are processed.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }

    // Desktop view with updated styling to match UI
    return (
        <>
            <div className="bg-white ">
                <table className="min-w-full">
                    {paginatedTransactions.length > 0 ? (
                        <>
                            <thead className="">
                                <tr className="text-left text-gray-600 text-sm">
                                    <th className="py-3 px-6 font-medium">Transaction ID</th>
                                    <th className="py-3 px-6 font-medium">User Name</th>
                                    <th className="py-3 px-6 font-medium">Event Name</th>
                                    <th className="py-3 px-6 font-medium">Amount (£)</th>
                                    <th className="py-3 px-6 font-medium">Date/Time</th>
                                    <th className="py-3 px-6 font-medium">Payment Status</th>
                                    <th className="py-3 px-6 font-medium">Booking Status</th>
                                    <th className="py-3 px-6 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedTransactions.map((transaction, index) => (
                                    <tr key={`${transaction.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-blue-600 font-medium">
                                            #{transaction.id}
                                        </td>
                                        <td className="py-4 px-6 text-gray-900">
                                            {transaction.userName}
                                        </td>
                                        <td className="py-4 px-6 text-gray-900">
                                            {transaction.eventName}
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 font-medium">
                                            {transaction.amount}
                                        </td>
                                        <td className="py-4 px-6   flex flex-col">
                                            <span className="text-nowrap text-[15px] text-black font-medium">{formatDate(transaction.transactionDate)}</span>
                                            <span className="text-nowrap text-[12px] text-[#303237] font-normal">{formatTime(transaction.transactionDate)}</span>                                            
                                        </td>
                                        <td className="py-4 px-6">
                                            <StatusBadge status={transaction.paymentStatus} />
                                        </td>
                                        <td className="py-4 px-6">
                                            <StatusBadge status={transaction.bookingStatus} />
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => openTransactionDetails(transaction)}
                                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="7" className="text-center py-12">
                                    <img src="/transaction.png" alt="No Transactions" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                                    <div className="text-gray-800 font-semibold text-lg mb-2">
                                        No Transaction History Yet
                                    </div>
                                    <div className="text-gray-500">
                                        Events payment and refunds will appear here once transactions are processed.
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onRefund={handleRefund}
                />
            )}
        </>
    );
}
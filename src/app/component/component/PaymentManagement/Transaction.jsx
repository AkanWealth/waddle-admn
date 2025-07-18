"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
// import { authService } from "@/utils/authService";
// import TransactionDetailsModal from "./TransactionDetailsModal";
import TransactionDetailsModal from "../ModalPages/Payment/PaymentDetailsModal";

export default function TransactionTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [paginatedTransactions, setPaginatedTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Dummy transaction data
    const dummyTransactions = [
        {
            id: "TXN2345",
            userName: "Jane Doe",
            eventName: "Kid Timeout with Jane",
            amount: "£25",
            status: "Successful",
            date: "2024-06-01",
            userEmail: "jane.doe@email.com",
            transactionDate: "2024-06-01T10:30:00Z"
        },
        {
            id: "TXN2369",
            userName: "Jane Doe",
            eventName: "Family Fun Day",
            amount: "£25",
            status: "Pending",
            date: "2024-06-02",
            userEmail: "jane.doe@email.com",
            transactionDate: "2024-06-02T14:15:00Z"
        },
        {
            id: "TXN3087",
            userName: "Smith Doe",
            eventName: "Storytelling Session",
            amount: "£25",
            status: "Successful",
            date: "2024-06-03",
            userEmail: "smith.doe@email.com",
            transactionDate: "2024-06-03T16:45:00Z"
        },
        {
            id: "TXN3087",
            userName: "Peter Mary",
            eventName: "Family Fun Day",
            amount: "£25",
            status: "Failed",
            date: "2024-06-04",
            userEmail: "peter.mary@email.com",
            transactionDate: "2024-06-04T11:20:00Z"
        },
        {
            id: "TXN4532",
            userName: "Kevin Thi",
            eventName: "Dance Workshop",
            amount: "£25",
            status: "Cancelled",
            date: "2024-06-05",
            userEmail: "kevin.thi@email.com",
            transactionDate: "2024-06-05T09:10:00Z"
        },
        {
            id: "TXN4067",
            userName: "Loveth Mary",
            eventName: "Family Fun Day",
            amount: "£25",
            status: "Pending",
            date: "2024-06-06",
            userEmail: "loveth.mary@email.com",
            transactionDate: "2024-06-06T13:30:00Z"
        },
        {
            id: "TXN8765",
            userName: "Esther James",
            eventName: "Storytelling Session",
            amount: "£25",
            status: "Refunded",
            date: "2024-06-07",
            userEmail: "esther.james@email.com",
            transactionDate: "2024-06-07T15:25:00Z"
        },
        {
            id: "TXN2345",
            userName: "James Brown",
            eventName: "Kid Timeout with Jane",
            amount: "£25",
            status: "Pending",
            date: "2024-06-08",
            userEmail: "james.brown@email.com",
            transactionDate: "2024-06-08T12:40:00Z"
        }
    ];

    // Load dummy data on component mount
    useEffect(() => {
        setAllTransactions(dummyTransactions);
    }, []);

    // Apply search and filters
    useEffect(() => {
        let results = [...allTransactions];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                transaction =>
                    transaction.userName.toLowerCase().includes(term) ||
                    transaction.eventName.toLowerCase().includes(term) ||
                    transaction.id.toLowerCase().includes(term) ||
                    transaction.userEmail.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(transaction => statusFilter.includes(transaction.status));
        }

        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(transaction => transaction.date >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(transaction => transaction.date <= dateFilter.to);
        }

        setFilteredTransactions(results);
    }, [allTransactions, searchTerm, statusFilter, dateFilter]);

    // Pagination logic
    const itemsPerPage = 7;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedTransactions(filteredTransactions.slice(startIndex, endIndex));
    }, [currentPage, filteredTransactions]);

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
                        ? { ...transaction, status: "Refunded" }
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
                    onClick={() => setError(null)}
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
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
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
                                            <StatusBadge status={transaction.status} />
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
                                <td colSpan="3" className="text-center py-8">
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full">
                    {paginatedTransactions.length > 0 ? (
                        <>
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-left text-gray-600 text-sm">
                                    <th className="py-3 px-6 font-medium">Transaction ID</th>
                                    <th className="py-3 px-6 font-medium">User Name</th>
                                    <th className="py-3 px-6 font-medium">Event Name</th>
                                    <th className="py-3 px-6 font-medium">Amount (£)</th>
                                    <th className="py-3 px-6 font-medium">Status</th>
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
                                        <td className="py-4 px-6">
                                            <StatusBadge status={transaction.status} />
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
                                <td colSpan="6" className="text-center py-12">
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

/* 
// Commented out API integration for future use
const fetchTransactions = async () => {
    try {
        setLoading(true);
        setError(null);
        
        const response = await authService.makeAuthenticatedRequest('/api/v1/transactions/all');
        
        if (response && response.transactions) {
            const transformedTransactions = response.transactions.map(transformTransactionData);
            setAllTransactions(transformedTransactions);
        } else {
            setError('No transactions data received');
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message || 'Failed to fetch transactions');
    } finally {
        setLoading(false);
    }
};

const transformTransactionData = (transaction) => {
    return {
        id: transaction.id,
        userName: transaction.user_name || transaction.customerName,
        eventName: transaction.event_name || transaction.eventTitle,
        amount: `£${transaction.amount}`,
        status: transaction.status,
        date: new Date(transaction.createdAt).toISOString().split('T')[0],
        userEmail: transaction.user_email,
        transactionDate: transaction.createdAt,
        // Add other fields as needed
    };
};
*/
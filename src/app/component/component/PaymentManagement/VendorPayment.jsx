"use client";

import { useState, useEffect } from "react";

// StatusBadge component
const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

export default function PaymentManagementTable({ currentPage = 1, searchTerm = "", statusFilter = [], dateFilter = {}, mobileView = false }) {
    const [allVendors, setAllVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dummy data to replace API calls
    const dummyVendors = [
        {
            id: 1,
            name: "XYZ Events",
            mobile: "+234 801 234 5678",
            email: "contact@xyzevents.com",
            date: "2025-03-04",
            status: "Completed",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 2,
            name: "ABC Org",
            mobile: "+234 802 345 6789",
            email: "info@abcorg.com",
            date: "2025-03-04",
            status: "Pending",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 3,
            name: "Happy Kids",
            mobile: "+234 803 456 7890",
            email: "hello@happykids.com",
            date: "2025-03-04",
            status: "Completed",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 4,
            name: "Elite Dance School",
            mobile: "+234 804 567 8901",
            email: "admin@elitedance.com",
            date: "2025-03-04",
            status: "Pending",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 5,
            name: "ABC Events",
            mobile: "+234 805 678 9012",
            email: "events@abc.com",
            date: "2025-03-04",
            status: "Overdue",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 6,
            name: "XYZ Events",
            mobile: "+234 806 789 0123",
            email: "xyz@events.com",
            date: "2025-03-04",
            status: "Pending",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 7,
            name: "Kane Events",
            mobile: "+234 807 890 1234",
            email: "info@kaneevents.com",
            date: "2025-03-04",
            status: "Overdue",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        },
        {
            id: 8,
            name: "Zoo Park",
            mobile: "+234 808 901 2345",
            email: "contact@zoopark.com",
            date: "2025-03-04",
            status: "Pending",
            totalEarnings: "£20",
            lastPaymentDate: "04-03-2025",
            nextPaymentDate: "04-03-2025"
        }
    ];

    // Load dummy data instead of API call
    const fetchVendors = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setAllVendors(dummyVendors);
        } catch (error) {
            console.error('Error fetching vendors:', error);
            setError(error.message || 'Failed to fetch vendors');
        } finally {
            setLoading(false);
        }
    };

    // Fetch vendors on component mount
    useEffect(() => {
        fetchVendors();
    }, []);

    // Apply search and filters
    useEffect(() => {
        let results = [...allVendors];

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                vendor =>
                    vendor.name.toLowerCase().includes(term) ||
                    vendor.email.toLowerCase().includes(term) ||
                    vendor.mobile.includes(term)
            );
        }

        // Apply status filter
        if (statusFilter && statusFilter.length > 0) {
            results = results.filter(vendor => statusFilter.includes(vendor.status));
        }

        // Apply date filter
        if (dateFilter.from) {
            results = results.filter(vendor => vendor.date >= dateFilter.from);
        }
        if (dateFilter.to) {
            results = results.filter(vendor => vendor.date <= dateFilter.to);
        }

        setFilteredVendors(results);
    }, [allVendors, searchTerm, statusFilter, dateFilter]);

    const handleViewDetails = (vendor) => {
        console.log('View details for:', vendor);
        // Modal logic would go here
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading vendors...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-8">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button 
                    onClick={fetchVendors}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                {filteredVendors.length > 0 ? (
                    <>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vendor Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Earnings (£)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Payment Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Next Payment Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredVendors.map((vendor) => (
                                <tr key={vendor.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {vendor.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {vendor.totalEarnings}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {vendor.lastPaymentDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={vendor.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {vendor.nextPaymentDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleViewDetails(vendor)}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
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
                                <div className="text-gray-500">
                                    <div className="text-4xl mb-4">📄</div>
                                    <div className="text-lg font-medium text-gray-900 mb-2">No Payments Yet</div>
                                    <div className="text-sm">
                                        It looks like no payments have been made yet. Once payments are processed, their details will appear here.
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}
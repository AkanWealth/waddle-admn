"use client";

import { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";

import VendorDetailsModal from "../ModalPages/Users/viewPendingDetail";
import VendorApproveDetailsModal from "../ModalPages/Users/viewApprovemodal";

export default function VendorsTable({ currentPage, searchTerm, statusFilter, dateFilter, mobileView }) {
    // Sample data for vendors
    const [allVendors, setAllVendors] = useState([
        {
            id: 1,
            name: "XYZ Events",
            mobile: "(212) 555-1234",
            email: "john.smith@email.com",
            date: "2024-05-15",
            status: "Pending",
            contactName: "John Smith",
            description: "Professional event management services for corporate and private clients.",
            contactDetails: {
                phone: "(212) 555-1234",
                email: "john.smith@email.com",
                address: "123 Broadway, New York, NY",
                website: "www.xyzevents.com"
            },
            taxId: "123-45-6789",
            businessLicense: "XYZ Events License.PDF"
        },
        {
            id: 2,
            name: "ABC Org",
            mobile: "(323) 555-5678",
            email: "emily.j@email.com",
            date: "2024-06-20",
            status: "Rejected"
        },
        {
            id: 3,
            name: "Happy Kids",
            mobile: "(312) 555-8765",
            email: "mwilliams@email.com",
            date: "2024-07-02",
            status: "Approved"
        },
        {
            id: 4,
            name: "Elite Dancer School",
            mobile: "(713) 555-2345",
            email: "jessica.b@email.com",
            date: "2024-08-10",
            status: "Pending",
            contactName: "Jessica Brown",
            description: "Designed to teach and train family both parents and children. this is very nice this rich and enjoyable. Bring your kids let us train them to be professional from foundation.",
            contactDetails: {
                phone: "(713) 555-2345",
                email: "jessica.b@email.com",
                address: "362 Sycamore St, Detroit, MI",
                website: "www.elitedancers.com"
            },
            taxId: "987-65-4321",
            businessLicense: "Elite Dancer Business Licence.PDF"
        },
        {
            id: 5,
            name: "ABC Events",
            mobile: "(305) 555-6789",
            email: "david.a@email.com",
            date: "2024-09-12",
            status: "Approved"
        },
        {
            id: 6,
            name: "XYZ Events",
            mobile: "(206) 555-1357",
            email: "sarah.m@email.com",
            date: "2024-10-05",
            status: "Inactive"
        },
        {
            id: 7,
            name: "Kane Events",
            mobile: "(720) 555-2468",
            email: "daniel.t@email.com",
            date: "2024-11-18",
            status: "Deactivated"
        },
        // Rest of data...
    ]);

    const [filteredVendors, setFilteredVendors] = useState([]);
    const [paginatedVendors, setPaginatedVendors] = useState([]);

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    // Removed the auto-popup for pending vendors

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

    // Pagination logic
    const itemsPerPage = 7;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedVendors(filteredVendors.slice(startIndex, endIndex));
    }, [currentPage, filteredVendors]);

    // Function to open vendor details modal
    const openVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    // Function to handle vendor approval
    const handleApprove = (vendorId) => {
        setAllVendors(allVendors.map(vendor =>
            vendor.id === vendorId ? { ...vendor, status: "Approved" } : vendor
        ));
        // You would typically make an API call here to update the status in your backend
        console.log(`Vendor ${vendorId} approved`);
    };

    // Function to handle vendor rejection
    const handleReject = (vendorId) => {
        setAllVendors(allVendors.map(vendor =>
            vendor.id === vendorId ? { ...vendor, status: "Rejected" } : vendor
        ));
        // You would typically make an API call here to update the status in your backend
        console.log(`Vendor ${vendorId} rejected`);
    };

    // Render mobile view as a simplified table
    if (mobileView) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {paginatedVendors.length > 0 ? (
                        <>
                            <thead>
                                <tr className="text-left text-gray-500 text-sm border-b">
                                    <th className="pb-3 pr-2 font-medium">Vendor</th>
                                    <th className="pb-3 px-2 font-medium text-center">Status</th>
                                    <th className="pb-3 pl-2 font-medium text-center">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedVendors.map((vendor, index) => (
                                    <tr key={index} className="text-gray-800 text-sm border-b">
                                        <td className="py-4 pr-2">{vendor.name}</td>
                                        <td className="py-4 px-2 text-center">
                                            <StatusBadge status={vendor.status} />
                                        </td>
                                        <td className="py-4 pl-2 text-center">
                                            <button
                                                onClick={() => openVendorDetails(vendor)}
                                                className="text-blue-600 hover:underline"
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
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    <img src="/emptyFrame.png" alt="No Vendors" className="w-auto h-auto mx-auto mb-4" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-center py-2 text-gray-800 text-bold">
                                    No Vendors Yet
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-center text-gray-500">
                                    It looks like no vendors have joined the platform yet. Once vendors sign up, their details will appear here.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>

                {/* Vendor Details Modal */}
                {selectedVendor && selectedVendor.status === "Pending" ? (
                    <VendorDetailsModal
                        vendor={selectedVendor}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ) : (
                    <VendorApproveDetailsModal
                        vendor={selectedVendor}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                )}
            </div>
        );
    }

    // Desktop view remains unchanged but with modal functionality
    return (
        <>
            <table className="min-w-full">
                {paginatedVendors.length > 0 ? (
                    <>
                        <thead>
                            <tr className="text-left text-gray-500 text-sm">
                                <th className="pb-3 px-4 font-medium">User Name</th>
                                <th className="pb-3 px-4 font-medium">Mobile Number</th>
                                <th className="pb-3 px-4 font-medium">Email Address</th>
                                <th className="pb-3 px-4 font-medium">Registration Date</th>
                                <th className="pb-3 px-4 font-medium">Status</th>
                                <th className="pb-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVendors.map((vendor, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50 text-gray-500 text-sm hover:bg-gray-50">
                                    <td className="py-4 px-4">{vendor.name}</td>
                                    <td className="py-4 px-4">{vendor.mobile}</td>
                                    <td className="py-4 px-4">{vendor.email}</td>
                                    <td className="py-4 px-4">{vendor.date}</td>
                                    <td className="py-4 px-4"><StatusBadge status={vendor.status} /></td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => openVendorDetails(vendor)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                <img src="/emptyFrame.png" alt="No Vendors" className="w-auto h-auto mx-auto mb-4" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-center py-2 text-gray-800 text-bold">
                                No Vendors Yet
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center text-gray-500">
                                It looks like no vendors have joined the platform yet. Once vendors sign up, their details will appear here.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>

            {/* Vendor Details Modal */}
            {selectedVendor && selectedVendor.status === "Pending" ? (
                <VendorDetailsModal
                    vendor={selectedVendor}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            ) : (
                <VendorApproveDetailsModal
                    vendor={selectedVendor}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </>
    );
}
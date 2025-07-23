"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    // Create an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-6">
            <nav className="flex items-center">
                <button 
                    className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 mr-2"
                    onClick={() => {
                        if (currentPage > 1) {
                            onPageChange(currentPage - 1);
                        }
                    }}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                {pageNumbers.map(number => (
                    <button 
                        key={number}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === number 
                                ? "bg-[#2853A6] text-white" 
                                : "text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </button>
                ))}
                
                <button 
                    className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 ml-2"
                    onClick={() => {
                        if (currentPage < totalPages) {
                            onPageChange(currentPage + 1);
                        }
                    }}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </nav>
        </div>
    );
}
"use client";
import BookingManagement from "@/app/component/BookingManagement/BookingManagement";
import BookingsReportsModal from "@/app/component/BookingManagement/BookingsReportsModal";
import DownloadReportModal from "@/app/component/BookingManagement/DownloadReportModal";
import SVGAssets from "@/assets/svg";
import { useBookingStore } from "@/stores/useBookingStore";
import Image from "next/image";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const BookingPage = () => {
  const { openReportModalModal, isReportModalOpen, isDownloadReportModalOpen } =
    useBookingStore();
  return (
    <ProtectedRoute
      module="bookingManagement"
      redirectTo="/dashboard"
      fallback={null}
    >
      <section className="font-inter relative">
        <section className="font-inter flex justify-between items-center">
          {/* Dashboard header */}
          <section className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between mb-6 gap-4">
            <aside>
              <h1 className="font-inter text-xl md:text-2xl font-bold text-gray-800">
                Bookings Management
              </h1>
              <p className="text-gray-500 text-sm">
                View and manage all bookings here here
              </p>
            </aside>
          </section>
          <button
            onClick={openReportModalModal}
            className="rounded-[12px] py-[12px] px-[16px] bg-[#2853A6] flex items-center gap-[10px] cursor-pointer"
            type="button"
          >
            <Image
              src={SVGAssets.ReportIcon}
              className=""
              width={19}
              height={19}
              alt="Report"
            />
            <span className="text-[#FFFFFF] font-semibold">Report</span>
          </button>
        </section>
        <BookingManagement />
        {isReportModalOpen && <BookingsReportsModal />}
        {isDownloadReportModalOpen && <DownloadReportModal />}
      </section>
    </ProtectedRoute>
  );
};

export default BookingPage;

import { useBookingStore } from "@/stores/useBookingStore";
import { FolderMinus } from "lucide-react";

const DownloadReportModal = () => {
  const { isDownloadReportModalOpen, closeDownloadReportModal} =
    useBookingStore();

  if (!isDownloadReportModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
      onClick={closeDownloadReportModal} 
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start space-x-4">
          <div className="px-4 bg-[#DFEAFF] h-[56px] w-[56px] rounded-full flex items-center justify-center">
            <FolderMinus className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#303237]">Download Report</h3>
            <p className="text-sm text-gray-600">
              Your bookings report is ready for download. Please select your
              preferred format below.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={closeDownloadReportModal} 
            className="cursor-pointer flex-1 px-4 py-2 bg-[#2853A6] text-white rounded-[12px] font-semibold transition"
          >
            Download PDF
          </button>
          <button
           onClick={closeDownloadReportModal} 
            type="button"
            className="cursor-pointer flex-1 px-4 py-2 border border-[#2853A6] text-[#2853A6] rounded-[12px] font-semibold transition"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportModal;

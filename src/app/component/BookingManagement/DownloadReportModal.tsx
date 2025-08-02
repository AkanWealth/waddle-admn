import { useBookingStore } from "@/stores/useBookingStore"; 
import { FolderMinus } from "lucide-react"; 
import { bookingsService } from "@/utils/bookingService"; 
import { useEffect, useState } from "react"; 
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { useToastContext } from "@/context/toast";

// Define the type for vendor booking data
interface VendorBookingDataType {
  id: string;
  name: string;
  date: string;
  status: string;
  revenue: number;
}

const DownloadReportModal = () => { 
  const [vendorsBookingData, setVendorsBookingData] = useState<VendorBookingDataType[]>([]); 
  const { showMessage } = useToastContext();

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString()}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const fetchVendorRevenueData = async () => {
    const result = await bookingsService.getAllVendorBooking();
    if (result.success) {
      setVendorsBookingData(result.data);
    } else {
      console.error("Failed to fetch vendor revenue data:", result.error);
    }
  };
  useEffect(() => {
    fetchVendorRevenueData();
  }, []);
  const { isDownloadReportModalOpen, closeDownloadReportModal } =
    useBookingStore();

  if (!isDownloadReportModalOpen) return null;
  const handleDownloadReport = (type: 'pdf' | 'csv') => {
    if (!vendorsBookingData || vendorsBookingData.length === 0) {
      console.error("No data available to download");
      return;
    }

    if (type === 'pdf') {
      // Generate PDF
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text("Booking Report", 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
       doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Create table
      autoTable(doc, {
        head: [['Name', 'Date', 'Status', 'Revenue']],
        body: vendorsBookingData.map((booking) => [
          booking.name,
          formatDate(booking.date),
          booking.status,
          formatCurrency(booking.revenue)
        ]),
        startY: 40,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [40, 83, 166] }, // #2853A6
        alternateRowStyles: { fillColor: [245, 247, 250] }
      });
      
      // Save the PDF
      doc.save("booking-report.pdf");
      showMessage(
        "Report Exported",
        "Your report has been exported as a PDF file",
        "success"
      );

    } else if (type === 'csv') {
      // Generate CSV
      const headers = ['Name,Date,Status,Revenue\n'];
      const csvRows = vendorsBookingData.map(booking => {
        return `"${booking.name}","${formatDate(booking.date)}","${booking.status}","${formatCurrency(booking.revenue)}"`;
      });
      
      const csvContent = headers.concat(csvRows.join('\n')).join('');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, "booking-report.csv");
      showMessage(
        "Report Exported",
        "Your report has been exported as a CSV file",
        "success"
      );
    }
    
    // Close modal after download
    closeDownloadReportModal();
  };

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
            <h3 className="text-xl font-semibold text-[#303237]">
              Download Report
            </h3>
            <p className="text-sm text-gray-600">
              Your bookings report is ready for download. Please select your
              preferred format below.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
             type="button" 
             onClick={() => handleDownloadReport('pdf')} 
             className="cursor-pointer flex-1 px-4 py-2 bg-[#2853A6] text-white rounded-[12px] font-semibold transition" 
           > 
             Download PDF 
           </button> 
           <button 
             onClick={() => handleDownloadReport('csv')} 
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

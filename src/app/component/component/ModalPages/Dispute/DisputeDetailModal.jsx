import React, { useState } from 'react';
import { 
  TrendingUpDown, 
  FileText, 
  Upload,
  CircleCheck,
  TriangleAlert,
  Clock,
  XCircle
} from 'lucide-react';
import BaseModal from '../../Element/BaseModal';
import { useToastContext } from '@/context/toast';

const DisputeDetailModal = ({ isOpen, onClose, dispute }) => {
  const [response, setResponse] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useToastContext();

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      showMessage("Refund Approved", "Customer and vendor have been notified.", "success");
    }, 1000);
  };

  const handleDeny = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      showMessage("Denied Refund", "Vendor and customer have been notified.", "success");
    }, 1000);
  };

  if (!dispute) return null;

  // Status badge configuration
  const getStatusStyles = (status) => {
    switch (status) {
      case "In Review":
        return "bg-blue-100 text-blue-700";
      case "Resolved":
        return "bg-yellow-100 text-yellow-700";
      case "Closed":
        return "bg-green-100 text-green-700";
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Status icon configuration
  const getStatusIcon = (status) => {
    switch (status) {
      case "In Review":
        return <TrendingUpDown className="w-4 h-4 mr-1 text-blue-500" />;
      case "Resolved":
        return <TriangleAlert className="w-4 h-4 mr-1 text-orange-500" />;
      case "Closed":
        return <CircleCheck className="w-4 h-4 mr-1 text-green-500" />;
      case "Active":
        return <CircleCheck className="w-4 h-4 mr-1 text-green-500" />;
      case "Pending":
        return <Clock className="w-4 h-4 mr-1 text-gray-500" />;
      case "Inactive":
        return <XCircle className="w-4 h-4 mr-1 text-red-500" />;
      default:
        return null;
    }
  };

  const isActionable = dispute?.status === "In Review";
  console.log(dispute, "This is the dispute")

  // Dummy object for testing, replace with actual dispute data
  const disputeDetails = {
    id: dispute?.id || "#DPT-1023",
    customer: dispute?.customer || "John Doe",
    vendor: dispute?.vendor || "FunKids Hub",
    event: "Summer Kids Art Camp",
    reason: dispute?.reason || "Refund Request",
    reference: "BK-6789",
    dateEscalated: "March 17, 2025 - 10:30 AM",
    status: dispute?.status || "In Review",
    vendorStatement: "The customer is requesting a refund after attending half of the event. The event was delivered as promised, but they claim dissatisfaction"
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispute Summary"
      size={{ width: "99%", maxWidth: "800px" }}
      showDividers={false}
    >
      <hr className="border-gray-300 mb-6" />
      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${getStatusStyles(disputeDetails.status)}`}>
          {getStatusIcon(disputeDetails.status)}
          {disputeDetails.status}
        </span>
      </div>

      {/* Dispute Details */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-4">
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Dispute ID</p>
            <p className="font-medium">{disputeDetails.id}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Customer</p>
            <p className="font-medium">{disputeDetails.customer}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Vendor</p>
            <p className="font-medium">{disputeDetails.vendor}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Event</p>
            <p className="font-medium">{disputeDetails.event}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Reason</p>
            <p className="font-medium text-orange-500">{disputeDetails.reason}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
            <p className="font-medium">{disputeDetails.reference}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500 mb-1">Date Escalated</p>
            <p className="font-medium">{disputeDetails.dateEscalated}</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-6" />
      {/* Vendor's Statement */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Vendor's Submitted Information</h3>
        <h4 className="font-bold text-gray-800 mb-2">Vendor's Statement</h4>
        <div className="bg-gray-300 p-4 rounded-md text-sm text-gray-700">
          {disputeDetails.vendorStatement}
        </div>
      </div>

      {/* Attachments */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Attachments (if any)</h3>
        <div className="flex items-center p-3">
          <FileText className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Complaint_Summary.pdf</p>
            <p className="text-xs text-gray-500">200 KB</p>
          </div>
        </div>
      </div>

      {/* Only render admin response section and buttons if dispute is "In Review" */}
      {isActionable && (
        <>
          <hr className="border-gray-100 mb-6" />
          {/* Admin Response */}
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Admin Response & Actions</h3>
            
            <div className="mb-4">
              <label htmlFor="response" className="block text-sm font-bold text-gray-700 mb-1">
                Response
              </label>
              <textarea
                id="response"
                rows="4"
                placeholder="Write your response here.."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={response}
                onChange={handleResponseChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Attach Supporting Documents:<span className='font-medium ml-1'>(Optional)</span> 
              </label>
              <div className="border border-gray-300 border-dashed rounded-md p-4 text-center">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
                
                <div className="flex justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to upload</p>
                <p className="text-xs text-gray-500">JPG, PNG, PDF - max 5MB</p>
              </div>
            </div>
          </div>

          {/* Action Buttons - only shown for In Review status */}
          <div className="flex gap-4">
            <button 
              onClick={handleDeny}
              disabled={isLoading}
              className="flex-1 py-2 border border-[#2853A6] text-[#2853A6] rounded-md hover:bg-blue-50 transition-colors"
            >
              Deny
            </button>
            <button 
              onClick={handleApprove}
              disabled={isLoading}
              className="flex-1 py-2 bg-[#2853A6] text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Processing..." : "Approve"}
            </button>
          </div>
        </>
      )}

      {/* Resolution Information - only shown for non-In Review statuses */}
      {!isActionable && disputeDetails.status !== "Pending" && (
        <div className="mb-6">
          <hr className="border-gray-100 mb-6" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Resolution Summary</h3>
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
            {disputeDetails.status === "Resolved" && "This dispute has been resolved. The refund request was approved on March 18, 2025."}
            {disputeDetails.status === "Closed" && "This dispute has been closed. The refund request was denied on March 18, 2025."}
            {disputeDetails.status === "Active" && "This dispute is currently active. The dispute is being handled by the vendor directly."}
            {disputeDetails.status === "Inactive" && "This dispute is currently inactive. No further action is required at this time."}
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default DisputeDetailModal;
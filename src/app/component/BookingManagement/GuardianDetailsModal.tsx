import { useBookingStore } from "@/stores/useBookingStore";
import { ChevronLeft } from "lucide-react";
import { GuardianDetailsData } from "./SampleData";

export default function GuardianDetailsModal() {
  const { isOpenGuardianDetails, closeGuardianDetailsModal } =
    useBookingStore();

  if (!isOpenGuardianDetails) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center p-4  z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-200">
          <button
            onClick={closeGuardianDetailsModal}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-3"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600">Kid Timeout with Jane</span>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Guardian details
          </h2>

          <div className="w-full">
            <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-800 py-3 px-3 bg-[#F7F7F7] border-b border-b-[#E5E5E5] rounded-">
              <div>Guardian Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Children</div>
              <div className="text-center">Count</div>
            </div>

            <div className="space-y-1">
              {GuardianDetailsData.map((guardian, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-2 text-sm text-gray-700 py-3 px-3 ${
                    index % 2 === 0 ? "" : "bg-gray-50"
                  } hover:bg-gray-50  border-gray-100 transition-colors`}
                >
                  <div className="font-medium text-[#303237]">
                    {guardian.name}
                  </div>
                  <div className="text-gray-600 break-all">
                    {guardian.email}
                  </div>
                  <div className="text-gray-600">{guardian.phone}</div>
                  <div className="text-gray-600 flex flex-wrap gap-1">
                    {guardian.children.length > 0 ? (
                      guardian.children.map((child, index) => (
                        <span
                          key={index}
                          className="bg-[#E5E7EF] whitespace-nowrap rounded-[8px] py-1 px-2"
                        >
                          {child}
                        </span>
                      ))
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>

                  <div className="text-center font-medium">
                    {guardian.count}
                  </div>
                </div>
              ))}
            </div>

            {GuardianDetailsData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No guardian data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

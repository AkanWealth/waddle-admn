// import { useToastContext } from "@/context/toast";
import { useToastContext } from "@/context/toast";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import { recommendationService } from "@/utils/recommendationService";
import { CircleCheck } from "lucide-react";

const ApprovePlaceModal = () => {
  const {
    closeShowApproveDetailsModal,
    closeShowPlaceDetailsModal,
    refreshEvents,
    selectedPlace,
    updatePlaceStatus,
  } = useRecommendationsStore();
  const { showMessage } = useToastContext();
  const handleApprovePlace = async () => {
    if (!selectedPlace) return;
    const result = await recommendationService.approveRecommendationPlace(
      selectedPlace.id
    );
    updatePlaceStatus(selectedPlace.id, "Approved");
    if (result.success) {
      showMessage(
        "Place Approved!",
        "Place approved and published to the app!",
        "success"
      );
      await refreshEvents("Places");
      closeShowApproveDetailsModal();
      closeShowPlaceDetailsModal();
    } else {
      console.error("Error approving place:", result.error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[529px] max-h-screen overflow-y-auto p-5">
        <div className="flex gap-3 items-start">
          <div className="bg-[#CDFFE9] rounded-full p-1.5 flex items-center justify-center">
            <CircleCheck className="text-[#33cc8a] w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-[#303237] mb-1">
              Approve This Place?
            </h3>
            <p className="text-[#565C69] text-[15px]">
              You&apos;re about to approve this parent-recommended place. Once
              approved, it will be published to the app and visible under
              “Parent Recommendations.”
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex mt-6 gap-4">
          <button
            onClick={handleApprovePlace}
            type="button"
            className="bg-[#2853A6] rounded-xl text-white flex-1 py-2 font-medium"
          >
            Approve & Publish
          </button>
          <button
            onClick={() => closeShowApproveDetailsModal()}
            type="button"
            className="border border-[#2853A6] text-[#2853A6] rounded-xl flex-1 py-2 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovePlaceModal;

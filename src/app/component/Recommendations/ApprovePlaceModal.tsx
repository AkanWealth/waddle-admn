// import { useToastContext } from "@/context/toast";
import { useToastContext } from "@/context/toast";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import { recommendationService } from "@/utils/recommendationService";
import { CircleCheck } from "lucide-react";

const ApprovePlaceModal = ({ tab }: { tab: "place" | "event" | null }) => {
  console.log(tab, "This is the tab in ApprovePlaceModal");
  const {
    closeShowPlaceDetailsModal,
    closeShowApproveDetailsModal,
    closeShowEventDetailsModal,
    refreshEvents,
    selectedPlace,
    selectedEvent,
    updatePlaceStatus,
    showPlaceDetailsModal,
    showEventDetailsModal,
    updateEventStatus,
  } = useRecommendationsStore();
  const { showMessage } = useToastContext();

  // Determine acting context robustly
  const context: "place" | "event" =
    tab ??
    (showPlaceDetailsModal && selectedPlace
      ? "place"
      : showEventDetailsModal && selectedEvent
      ? "event"
      : selectedPlace
      ? "place"
      : selectedEvent
      ? "event"
      : "place");

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
      closeShowPlaceDetailsModal();
      closeShowApproveDetailsModal();
    } else {
      console.error("Error approving place:", result.error);
    }
  };

  const handleApproveEvent = async () => {
    if (!selectedEvent) return;
    const result = await recommendationService.approveRecommendationPlace(
      selectedEvent.id
    );
    updateEventStatus(selectedEvent.id, "Approved");
    if (result.success) {
      showMessage(
        "Event Approved!",
        "Event approved and published to the app!",
        "success"
      );
      await refreshEvents("Events");
      closeShowApproveDetailsModal();
      closeShowEventDetailsModal();
    } else {
      console.error("Error approving event:", result.error);
    }
  };
  const handleApprove = () => {
    if (context === "place") {
      handleApprovePlace();
    } else if (context === "event") {
      handleApproveEvent();
    } else {
      // Fallback: infer from selected item
      if (selectedPlace) {
        handleApprovePlace();
      } else if (selectedEvent) {
        handleApproveEvent();
      }
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
              Approve This {context === "place" ? "Place" : "Event"}?
            </h3>
            <p className="text-[#565C69] text-[15px]">
              You&apos;re about to approve this parent-recommended{" "}
              {context === "place" ? "place" : "event"}. Once approved, it will
              be published to the app and visible under “Parent
              Recommendations.”
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex mt-6 gap-4">
          <button
            onClick={handleApprove}
            type="button"
            className="bg-[#2853A6] rounded-xl text-white flex-1 py-2 font-medium"
          >
            {context === "place" ? "Approve Place" : "Approve Event"}
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

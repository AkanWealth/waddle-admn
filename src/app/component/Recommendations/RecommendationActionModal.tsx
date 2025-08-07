import { useRef } from "react";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import { MessageSquareX, Quote, ThumbsUp, Route } from "lucide-react";

const RecommendationActionModalItems = [
  { id: 1, Icon: Route, text: "View Details" },
  { id: 2, Icon: Quote, text: "Parent Reviews" },
  { id: 3, Icon: ThumbsUp, text: "Approve Place" },
  { id: 4, Icon: MessageSquareX, text: "Reject Place" },
];

interface RecommendationActionModalProps {
  onClose: () => void;
  status: string;
}

const RecommendationActionModal: React.FC<RecommendationActionModalProps> = ({
  onClose,
  status,
}) => {
  const {
    openShowPlaceDetailsModal,
    openShowApproveDetailsModal,
    openShowRejectDetailsModal,
    openShowParentReviewsModal,
  } = useRecommendationsStore();

  //  const {
  //    openShowApproveDetailsModal,
  //    closeShowApproveDetailsModal,
  //    closeShowPlaceDetailsModal,
  //  } = useRecommendationsStore() as {
  //    openShowApproveDetailsModal: () => void;
  //    closeShowApproveDetailsModal: () => void;
  //    closeShowPlaceDetailsModal: () => void;
  //  };
  const modalRef = useRef<HTMLDivElement>(null);

  const isDisabled = status === "REJECTED" || status === "APPROVED";

  const handleClick = (tab: number, disabled: boolean) => {
    if (disabled) return;

    if (tab === 1) {
      openShowPlaceDetailsModal();
    } else if (tab === 2) {
      openShowParentReviewsModal();
    } else if (tab === 3) {
      openShowApproveDetailsModal();
    } else if (tab === 4) {
      openShowRejectDetailsModal(); // Add this line
    }

    onClose();
  };

  return (
    <div ref={modalRef} className="z-50 w-[290px]">
      <div className="bg-white shadow-2xl rounded-[20px] border border-[#E5E7EF]">
        {RecommendationActionModalItems.map(({ id, Icon, text }) => {
          const disabled = isDisabled && (id === 3 || id === 4);

          return (
            <button
              key={id}
              onClick={() => handleClick(id, disabled)}
              disabled={disabled}
              className={`w-full flex items-center gap-2.5 px-5 py-3 text-left transition rounded-none border-t border-gray-100
                ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#EAEEF6]"
                }
              `}
            >
              <Icon className="shrink-0" />
              <span className="text-base text-[#303237] font-normal">
                {text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationActionModal;

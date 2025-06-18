import { useEffect, useRef, useState } from "react";
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
}

const RecommendationActionModal: React.FC<RecommendationActionModalProps> = ({ onClose }) => {
  const { openShowPlaceDetailsModal } = useRecommendationsStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [showAbove, setShowAbove] = useState(false);


  

  useEffect(() => {
    if (!modalRef.current) return;

    const buttonRect = modalRef.current.parentElement?.getBoundingClientRect();
    const modalHeight = 200; // Estimate or calculate dynamically if needed

    if (buttonRect) {
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // If there's not enough space below but enough space above
      if (spaceBelow < modalHeight && spaceAbove > modalHeight) {
        setShowAbove(true);
      }
    }
  }, []);

  const handleClick = (tab: number) => {
    if (tab === 1) {
      openShowPlaceDetailsModal();
    }
    if(tab === 2) {
      // Handle parent reviews action here
      console.log("Parent Reviews action triggered");
    }
    onClose();
    if(tab === 3) {
      // Call the approve recommendation function here
      console.log("Approve Place action triggered");
    }
    if(tab === 4) {
      // Call the reject recommendation function here
      console.log("Reject Place action triggered");
    }
    console.log(tab);
  };

  return (
    <div
      ref={modalRef}
      className={`absolute right-0 z-50 w-[290px] ${showAbove ? "bottom-full mb-2" : "top-full mt-2"}`}
    >
      <div className="bg-white shadow-2xl rounded-[20px] border border-[#E5E7EF]">
        {RecommendationActionModalItems.map(({ id, Icon, text }) => (
          <div
            key={id}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(id)}
            className="py-2 hover:bg-[#EAEEF6] cursor-pointer"
          >
            <div className="flex items-center pl-5 gap-2.5">
              <Icon />
              <h3 className="text-base text-[#303237] font-normal">{text}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationActionModal;

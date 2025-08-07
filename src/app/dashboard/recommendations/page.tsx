/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Clock,
  XCircle,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import TabNavigation from "@/app/component/Recommendations/TabNavigation";
import PaginationComponent from "@/app/component/Element/PaginationComponent";
import RecommendationActionModal from "@/app/component/Recommendations/RecommendationActionModal";
import { useRecommendationsStore } from "@/stores/useRecommendationStore";
import PlacesDetailsModal from "@/app/component/Recommendations/PlacesDetailsModal";
import ApprovePlaceModal from "@/app/component/Recommendations/ApprovePlaceModal";
import formatCustomDate from "@/lib/formatDate";
import SVGAssets from "@/assets/svg";
import Image from "next/image";
import RejectPlaceModal from "@/app/component/Recommendations/RejectPlaceModal";
import ParentReviewsModal from "@/app/component/Recommendations/ParentReviewsModal";

interface Recommendation {
  id: string;
  name: string;
  creator: {
    name: string;
  };
  createdAt: string;
  date: string;
  address: string;
  category: string;
  status: "Pending" | "Rejected" | "Approved";
  isDeleted: boolean;
  isVerified: boolean;
}

function determineStatus(
  event: Recommendation
): "Pending" | "Rejected" | "Approved" {
  console.log(event);
  if (event == "APPROVED") {
    return "Approved";
  }
  if (event == "REJECTED") {
    return "Rejected";
  }
  if (event == "PENDING") {
    return "Pending";
  }
}

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by Place name, Location, Parent Name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-[#272727] w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-[#272727]"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>
    </div>
  );
};

// Status Badge Component
// interface StatusBadgeProps {
//   status: "Pending" | "Rejected" | "Approved";
// }

const StatusBadge = ({ status }: string) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4 text-[#272727]" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-[#CB1A14]" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#E5E5E5] text-[#272727]";
      case "REJECTED":
        return "bg-[#FFDEDE] text-[#CB1A14]";
      case "APPROVED":
        return "bg-green-50 text-green-700 border border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
        status
      )}`}
    >
      {getStatusIcon(status)}
      {status}
    </div>
  );
};

// Table Row Component
interface TableRowProps {
  recommendation: Recommendation;
  onActionClick: (item: Recommendation) => void;
  showModal: boolean;
  onCloseModal: () => void;
  activeModalId: string | null;
}

const TableRow: React.FC<TableRowProps> = ({
  activeModalId,
  recommendation,
  onActionClick,
  onCloseModal,
}) => {
  const isActive = activeModalId === recommendation.id;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleActionClick = (item: Recommendation) => {
    if (isActive) {
      onCloseModal();
    } else {
      onActionClick(item);
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4 text-sm text-[#515151] font-semibold">
        {recommendation.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.creator.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {console.log(recommendation, "This is the date")}
        {formatCustomDate(recommendation.createdAt, "DD-MM-YYYY")}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.address}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.category}
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={recommendation.status} />
      </td>
      <td className="py-3 px-4 relative">
        <button
          ref={buttonRef}
          onClick={() => handleActionClick(recommendation)}
          className="text-gray-400 hover:text-gray-600"
          data-id={recommendation.id}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

// Table Component
interface RecommendationsTableProps {
  activeTab: string;
  data: Recommendation[];
  activeModalId: string | null;
  onActionClick: (item: Recommendation) => void;
  onCloseModal: () => void;
}

const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  activeTab,
  data,
  activeModalId,
  onActionClick,
  onCloseModal,
}) => {
  return (
    <>
      {activeTab === "Places" ? (
        <div className="w-full overflow-y-hidden relative h-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Place Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Submitted By
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Date Submitted
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="overflow-y-hidden">
              {data.map((item) => (
                <TableRow
                  activeModalId={activeModalId}
                  key={item.id}
                  recommendation={item}
                  onActionClick={onActionClick}
                  showModal={activeModalId === item.id}
                  onCloseModal={onCloseModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full overflow-y-hidden relative h-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Event Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Submitted By
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Date Submitted
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Entry Fee
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="overflow-y-hidden">
              {data.map((item) => (
                <TableRowEvents
                  activeModalId={activeModalId}
                  key={item.id}
                  event={item}
                  onActionClick={onActionClick}
                  showModal={activeModalId === item.id}
                  onCloseModal={onCloseModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

interface TableRowEventsProps {
  event: import("@/types/IRecommendations").Event;
  onActionClick: (item: import("@/types/IRecommendations").Event) => void;
  showModal: boolean;
  onCloseModal: () => void;
  activeModalId: string | null;
}

const TableRowEvents: React.FC<TableRowEventsProps> = ({
  activeModalId,
  event,
  onActionClick,
  onCloseModal,
}) => {
  const isActive = activeModalId === event.id;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleActionClick = (
    item: import("@/types/IRecommendations").Event
  ) => {
    if (isActive) {
      onCloseModal();
    } else {
      onActionClick(item);
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4 text-sm text-[#515151] font-semibold">
        {event.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{event.submittedBy}</td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {formatCustomDate(event.dateSubmitted, "DD-MM-YYYY")}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{event.entryFee}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{event.category}</td>
      <td className="py-3 px-4">
        <StatusBadge status={determineStatus(event.status)} />
      </td>
      <td className="py-3 px-4 relative">
        <button
          ref={buttonRef}
          onClick={() => handleActionClick(event)}
          className="text-gray-400 hover:text-gray-600"
          data-id={event.id}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

const ParentRecommendations: React.FC = () => {
  const {
    places,
    events,
    refreshEvents,
    setSelectedPlace,
    setSelectedEvent,
    showPlaceDetailsModal,
    showApproveDetailsModal,
    showRejectDetailsModal,
    closeShowRejectDetailsModal,
    showParentReviewsModal,
    selectedPlace,
  } = useRecommendationsStore();
  const [activeTab, setActiveTab] = useState<string>("Places");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const itemsPerPage = 7;

  useEffect(() => {
    refreshEvents(activeTab as "Places" | "Events");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Filtering and pagination logic for each tab
  const filteredPlaces = places.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEvents = events.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(
    (activeTab === "Places" ? filteredPlaces.length : filteredEvents.length) /
      itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlaces = filteredPlaces.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Action click handlers for each tab
  const handleActionClickPlace = (item: Recommendation) => {
    setSelectedPlace(item);
    setActiveModalId(item.id);
    positionModal(item.id);
  };

  const handleActionClickEvent = (
    item: import("@/types/IRecommendations").Event
  ) => {
    setSelectedEvent(item);
    setActiveModalId(item.id);
    positionModal(item.id);
  };

  const handleCloseModal = () => {
    setActiveModalId(null);
  };

  // Calculate modal position based on button position
  const positionModal = (id: string) => {
    setTimeout(() => {
      const button = document.querySelector(`button[data-id="${id}"]`);
      if (button) {
        const rect = button.getBoundingClientRect();
        const modalHeight = 220; // Approximate height of modal
        const modalWidth = 290; // Width from RecommendationActionModal

        // Check if there's enough space below
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceRight = window.innerWidth - rect.left;

        let top = rect.bottom + window.scrollY;
        let left = rect.left;

        // Position above if not enough space below
        if (spaceBelow < modalHeight) {
          top = rect.top + window.scrollY - modalHeight;
        }

        // Adjust horizontal position if needed
        if (spaceRight < modalWidth) {
          left = rect.right - modalWidth;
        }

        setModalPosition({ top, left });
      }
    }, 0);
  };

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If modal is open and click is outside modal and not on the trigger button
      if (activeModalId) {
        const modalElement = document.querySelector(".action-modal-container");
        const clickedButton = document.querySelector(
          `button[data-id="${activeModalId}"]`
        );

        if (
          modalElement &&
          !modalElement.contains(event.target as Node) &&
          clickedButton !== event.target &&
          !clickedButton?.contains(event.target as Node)
        ) {
          handleCloseModal();
        }
      }
    };

    // Add event listener when modal is open
    if (activeModalId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModalId]); // Re-run effect when activeModalId changes

  const handleFilterClick = () => {
    // Handle filter logic here
  };

  return (
    <div className="w-full max-w-none relative">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Parent-Recommendations
        </h1>
        <p className="text-gray-600 text-sm">
          Discover and manage the latest place suggestions from parents.
        </p>
      </div>

      <div className="bg-white px-2 py-2">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          <span>
            {activeTab === "Places"
              ? "Recommended Places"
              : "Recommended Events"}
          </span>{" "}
          <span className="text-orange-500">
            {activeTab === "Places"
              ? `(${filteredPlaces.length})`
              : `(${filteredEvents.length})`}
          </span>
        </h2>

        <div className="mb-6">
          <div className="bg-white px-2 py-2 flex items-center justify-between">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFilterClick={handleFilterClick}
            />
          </div>
          <div className="bg-white relative">
            {activeTab === "Places" ? (
              paginatedPlaces.length === 0 ? (
                <NoRecommendations />
              ) : (
                <RecommendationsTable
                  activeTab={activeTab}
                  data={paginatedPlaces}
                  activeModalId={activeModalId}
                  onActionClick={handleActionClickPlace}
                  onCloseModal={handleCloseModal}
                />
              )
            ) : paginatedEvents.length === 0 ? (
              <NoRecommendations />
            ) : (
              <div className="w-full overflow-y-hidden relative h-full">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Event Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Submitted By
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Date Submitted
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Entry Fee
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm text-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-hidden">
                    {paginatedEvents.map((item) => (
                      <TableRowEvents
                        activeModalId={activeModalId}
                        key={item.id}
                        event={item}
                        onActionClick={handleActionClickEvent}
                        showModal={activeModalId === item.id}
                        onCloseModal={handleCloseModal}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {(activeTab === "Places"
        ? filteredPlaces.length > 0
        : filteredEvents.length > 0) && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      {showPlaceDetailsModal && (
        <PlacesDetailsModal selectedPlace={selectedPlace} />
      )}
      {showApproveDetailsModal && <ApprovePlaceModal />}

      {showRejectDetailsModal && (
        <RejectPlaceModal
          isOpen={showRejectDetailsModal}
          onClose={closeShowRejectDetailsModal}
          // onConfirm={handleRejectPlace}
        />
      )}
      {showParentReviewsModal && <ParentReviewsModal />}
      {/* Centralized Action Modal */}
      {activeModalId && (
        <div
          className="fixed z-50 action-modal-container"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <RecommendationActionModal
            status={selectedPlace.status}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default ParentRecommendations;

const NoRecommendations = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
      <Image
        src={SVGAssets.NoRecommendationsImage}
        alt="No Recommendations"
        width={151}
        height={168}
      />
      <h1 className="text-2xl font-bold text-gray-800">
        No Parent Recommendations Yet
      </h1>
      <p className="text-gray-500">
        You haven’t created any events yet. Get started by clicking the “Create
        Event”
      </p>
    </div>
  );
};

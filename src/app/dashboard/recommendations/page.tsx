"use client";
import React, { useEffect, useState } from "react";
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
import { recommendationService } from "@/utils/recommendationService";
import { toast } from "react-toastify";
import formatCustomDate from "@/lib/formatDate";

interface Recommendation {
  id: string;
  name: string;
  creator: {
    name: string;
  };
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
  if (event.isDeleted) return "Rejected";
  if (event.isVerified) return "Approved";
  return "Pending";
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
interface StatusBadgeProps {
  status: "Pending" | "Rejected" | "Approved";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-[#272727]" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-[#CB1A14]" />;
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#E5E5E5] text-[#272727]";
      case "Rejected":
        return "bg-[#FFDEDE] text-[#CB1A14]";
      case "Approved":
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onActionClick: (item: any) => void;
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

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 ">
      <td className="py-3 px-4 text-sm text-[#515151] font-semibold">
        {recommendation.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.creator.name}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {formatCustomDate(recommendation.date, "DD-MM-YYYY")}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.address}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {recommendation.category}
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={determineStatus(recommendation)} />
      </td>
      <td className="py-3 px-4 relative">
        <button
          onClick={() => onActionClick(recommendation)}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {isActive && <RecommendationActionModal onClose={onCloseModal} />}
      </td>
    </tr>
  );
};

// Table Component
interface RecommendationsTableProps {
  data: Recommendation[];
  activeModalId: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onActionClick: (item: any) => void;
  onCloseModal: () => void;
}

const RecommendationsTable: React.FC<RecommendationsTableProps> = ({
  data,
  activeModalId,
  onActionClick,
  onCloseModal,
}) => {
  return (
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
  );
};

const ParentRecommendations: React.FC = () => {
  const { showPlaceDetailsModal, showApproveDetailsModal, setSelectedPlace } =
    useRecommendationsStore();
  const [activeTab, setActiveTab] = useState<string>("Places");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const itemsPerPage = 7;
  const [placesList, setPlacesList] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function FetchEvents(): Promise<void> {
      const response = await recommendationService.getAllRecommendationsEvents(
        1,
        1000
      );
      console.log(response, "This is response from recommendations");
      if (response.success) {
        setPlacesList(response.data.events);
      } else {
        toast.error(response.error);
      }
    }

    FetchEvents();
  }, []);

  const filteredData = placesList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleActionClick = (item:any) => {
    setSelectedPlace(item)
    console.log("Action clicked for item:", item.id);
    setActiveModalId(item.id);
  };

  const handleCloseModal = () => {
    setActiveModalId(null);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
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
          <span className="">Recommended Places</span>{" "}
          <span className="text-orange-500">(12)</span>
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
            <RecommendationsTable
              data={paginatedData}
              activeModalId={activeModalId}
              onActionClick={handleActionClick}
              onCloseModal={handleCloseModal}
            />
          </div>
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {showPlaceDetailsModal && <PlacesDetailsModal />}
      {showApproveDetailsModal && <ApprovePlaceModal />}
    </div>
  );
};

export default ParentRecommendations;

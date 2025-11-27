/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

"use client";

import { reportService } from "@/utils/reportService";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  HelpCircle,
  Search,
} from "lucide-react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { format } from "date-fns";
import PaginationComponent from "@/app/component/Element/PaginationComponent";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "reviewed":
      return "py-[4px] px-[8px] rounded-[8px] w-fit bg-[#E0F5E6] text-[#28A745] text-[.875rem]";
    case "pending":
    case "PENDING":
      return "py-[4px] px-[8px] rounded-[8px] w-fit bg-[#E5E5E5] text-[#272727] text-[.875rem]";
    default:
      return "";
  }
};

const getRecommendationStatusBadge = (status: string) => {
  switch (status) {
    case "EVENT":
    case "Event":
      return {
        className:
          "bg-[#D5FFED] text-[#404040] py-[4px] px-[8px] rounded-[8px] flex items-center gap-[8px] text-[14px] w-fit",
        text: "Event",
        icon: <CalendarDays className="w-4 h-4 text-[#1E9A64]" />,
      };
    case "PLACE":
    case "Place":
      return {
        className:
          "bg-[#FFEBD5] py-[4px] px-[8px] rounded-[8px] flex items-center gap-[8px] text-[#404040] text-[14px] w-fit",
        text: "Place",
        icon: <MapPin className="w-4 h-4 text-[#D45815]" />,
      };
    default:
      return {
        className: "bg-[#E5E5E5] text-[#272727]",
        text: "Other",
        icon: <HelpCircle className="w-4 h-4 text-[#404040]" />,
      };
  }
};

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("events");

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // number of items per page

  // API DATA
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getFormatedDate = (isoDate: string) => {
    return format(new Date(isoDate), "MMM d, h:mma");
  };

  const fetchEvents = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedEvents(
      page,
      limit,
      search,
      startDate,
      endDate,
      status
    );

    if (response.success) {
      setEvents(response.data?.reports || []);
      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
    } else {
      setError(response.error as string);
    }

    setLoading(false);
  };

  // Fetch on page load and whenever filters change
  useEffect(() => {
    fetchEvents(1); // reset to page 1 on filter change
  }, [search, startDate, endDate, status]);

  const handlePageChange = (page: number) => {
    fetchEvents(page);
  };

  const tabs = [
    { id: "events", label: "Events" },
    { id: "recommendations", label: "Recommendations" },
    { id: "comments", label: "Comments" },
    { id: "review", label: "Review" },
  ];

  const fetchRecommendations = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedRecommendations(
      page,
      limit,
      search,
      startDate,
      endDate,
      status
    );

    if (response.success) {
      setRecommendations(response.data?.reports || []);
      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
    } else {
      setError(response.error as string);
    }

    setLoading(false);
  };

  // Fetch on page load and whenever filters change
  useEffect(() => {
    fetchRecommendations(1); // reset to page 1 on filter change
  }, [search, startDate, endDate, status]);

  const handleRecommendationsPageChange = (page: number) => {
    fetchRecommendations(page);
  };

  return (
    <section className="flex flex-col gap-[28px]">
      <aside className="flex flex-col gap-1">
        <h3 className="text-[#1D1D1E] font-bold text-[1.25rem]">
          Reports Management
        </h3>
        <p className="text-[#7B7B7B]">
          Review and take action on reported content from parents
        </p>
      </aside>

      <aside className="bg-[#FFFFFF] flex flex-col gap-[28px]">
        <div className="flex items-center gap-2 px-[25px] py-2">
          <h3 className="text-[#272727] font-medium text-[1.25rem]">
            Event Reports
          </h3>
          <p className="text-[#D45815] font-semibold text-[1rem]">
            ({events.length})
          </p>
        </div>

        {/* Tabs + Search */}
        <div className="px-[25px] flex justify-between items-center">
          <nav className="flex items-center gap-8 border border-[#E5E5E5] px-[12px] rounded-[12px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 font-medium relative ${
                  activeTab === tab.id ? "text-[#2853A6]" : "text-[#9F9F9F]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2853A6]" />
                )}
              </button>
            ))}
          </nav>

          {/* Search Input */}
          <div className="flex items-center gap-[24px]">
            <div className="relative border border-[#D0D0D0] py-[8px] px-[16px] rounded-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#919191]" />

              <input
                type="text"
                placeholder="Search by Place/event name, reporter or reason"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 w-full outline-none text-sm placeholder:text-[#7B7B7B]"
              />
            </div>

            {/* Filter BUTTON (future use for startDate/endDate/status) */}
            <button
              className="border border-[#D0D0D0] px-[12px] py-[8px] flex items-center gap-[12px] rounded-[8px]"
              type="button"
            >
              <span className="flex items-center gap-[4px]">
                <Filter size={16} />
                <span>Filter</span>
              </span>
              <ChevronDown />
            </button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#D0D0D0]" />

        {/* CONTENT */}
        <div className="px-[25px] py-2">
          {activeTab === "events" && (
            <>
              {/* LOADING */}
              {loading && (
                <div className="h-[200px] flex items-center justify-center text-[#303237]">
                  Loading reported events...
                </div>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-center py-4">{error}</p>
              )}

              {/* EMPTY */}
              {!loading && events.length === 0 && (
                <div className="h-[596px] p-[24px] flex items-center justify-center">
                  <div className="flex flex-col gap-[24px] items-center">
                    <div className="relative w-[160px] h-[160px]">
                      <Image
                        src="/blueLike.svg"
                        alt="Blue like"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col w-[400px] text-center">
                      <h2 className="text-[#303237] font-medium">
                        No reported events yet
                      </h2>
                      <p className="text-[#7E8494]">
                        All events are running smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS GRID */}
              {!loading && events.length > 0 && (
                <div className="p-[24px] grid grid-cols-2 gap-[28px]">
                  {events.map((event: any) => (
                    <div
                      key={event.id}
                      className="border border-[#F4F5F8] rounded-[12px] shadow p-[20px] flex flex-col gap-[16px]"
                    >
                      <div className="flex justify-between">
                        <h3 className="text-[#303237] font-semibold text-[1.25rem]">
                          {event.event.name}
                        </h3>
                        <BsThreeDotsVertical color="#303237" size={24} />
                      </div>

                      <div className="flex items-center gap-[12px]">
                        <p className="text-[#565C69] text-[.875rem]">
                          Reported by {event.reporter.name}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className="text-[#565C69] text-[.875rem]">
                          {getFormatedDate(event.createdAt)}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className={getStatusBadge(event.status)}>
                          {event.status}
                        </p>
                      </div>

                      <div className="flex items-center gap-[16px]">
                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reason
                          </h3>
                          <p className="text-[#CB1A14]">{event.reason}</p>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reported user/vendor
                          </h3>
                          <p className="text-[#303237]">
                            {event.event.organiser.name ||
                              event.event?.admin.first_name +
                                event.event?.admin.last_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "recommendations" && (
            <>
              {/* LOADING */}
              {loading && (
                <div className="h-[200px] flex items-center justify-center text-[#303237]">
                  Loading reported events...
                </div>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-center py-4">{error}</p>
              )}

              {/* EMPTY */}
              {!loading && recommendations.length === 0 && (
                <div className="h-[596px] p-[24px] flex items-center justify-center">
                  <div className="flex flex-col gap-[24px] items-center">
                    <div className="relative w-[160px] h-[160px]">
                      <Image
                        src="/blueLike.svg"
                        alt="Blue like"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col w-[400px] text-center">
                      <h2 className="text-[#303237] font-medium">
                        No reported recommendations yet
                      </h2>
                      <p className="text-[#7E8494]">
                        Parents have not reported any recommended places/events.
                        Reported recommendations will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS GRID */}
              {!loading && recommendations.length > 0 && (
                <div className="p-[24px] grid grid-cols-2 gap-[28px]">
                  {recommendations.map((recommendation: any) => (
                    <div
                      key={recommendation.id}
                      className="border border-[#F4F5F8] rounded-[12px] shadow p-[20px] flex flex-col gap-[16px]"
                    >
                      <div className="flex justify-between">
                        <h3 className="text-[#303237] font-semibold text-[1.25rem]">
                          {recommendation.crowdSource.name}
                        </h3>
                        <BsThreeDotsVertical color="#303237" size={24} />
                      </div>
                      <div
                        className={
                          getRecommendationStatusBadge(
                            recommendation.crowdSource.tag
                          ).className
                        }
                      >
                        {
                          getRecommendationStatusBadge(
                            recommendation.crowdSource.tag
                          ).icon
                        }
                        {
                          getRecommendationStatusBadge(
                            recommendation.crowdSource.tag
                          ).text
                        }
                      </div>

                      <div className="flex items-center gap-[12px]">
                        <p className="text-[#565C69] text-[.875rem]">
                          Reported by {recommendation.reporter.name}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className="text-[#565C69] text-[.875rem]">
                          {getFormatedDate(recommendation.createdAt)}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className={getStatusBadge(recommendation.status)}>
                          {recommendation.status}
                        </p>
                      </div>

                      <div className="flex items-center gap-[16px]">
                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reason
                          </h3>
                          <p className="text-[#CB1A14]">
                            {recommendation.reason}
                          </p>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reported user/vendor
                          </h3>
                          <p className="text-[#303237]">
                            {recommendation.crowdSource.creator.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeTab === "comments" && <div>Comments here</div>}
          {activeTab === "review" && <div>Review here</div>}
        </div>
      </aside>

      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        key={`${currentPage}-${totalPages}`} // optional key to reset component
      />
    </section>
  );
};

export default ReportsPage;

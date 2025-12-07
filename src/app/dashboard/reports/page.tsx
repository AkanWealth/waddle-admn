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
  X,
} from "lucide-react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { format } from "date-fns";
import PaginationComponent from "@/app/component/Element/PaginationComponent";
import ActionModal from "./ActionModal";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "reviewed":
      return "py-[4px] px-[8px] rounded-[8px] w-fit bg-[#E0F5E6] text-[#28A745] text-[.875rem]";
    case "RESOLVED":
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
  const [showFilter, setShowFilter] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pendingStatus, setPendingStatus] = useState<string | undefined>();
  const [pendingStartDate, setPendingStartDate] = useState<
    string | undefined
  >();
  const [pendingEndDate, setPendingEndDate] = useState<string | undefined>();

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // number of items per page

  // API DATA
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionsAnchor, setActionsAnchor] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const getFormatedDate = (isoDate: string) => {
    return format(new Date(isoDate), "MMM d, h:mma");
  };

  const fetchEvents = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedEvents(
      page,
      limit,
      debouncedSearch,
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

  // Fetch events when filters change and Events tab is active
  // Moved into combined effect below to ensure only active tab fetches

  const handlePageChange = (page: number) => {
    if (activeTab === "events") {
      fetchEvents(page);
    } else if (activeTab === "recommendations") {
      fetchRecommendations(page);
    } else if (activeTab === "comments") {
      fetchComments(page);
    } else if (activeTab === "reviews") {
      fetchReviews(page);
    }
  };

  const openActions = (item: any, e: React.MouseEvent) => {
    setSelectedItem(item);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 8; // 8px below trigger
    const width = 360; // ActionModal width
    let left = rect.right + window.scrollX - width; // align right edge of popover with trigger
    if (left < 8) left = 8; // keep within viewport
    setActionsAnchor({ top, left });
    setShowActions(true);
  };

  const closeActions = () => {
    setShowActions(false);
    setSelectedItem(null);
    setActionsAnchor(null);
  };

  const getActionIds = (item: any) => {
    switch (activeTab) {
      case "events":
        return { reportId: item?.id, contentId: item?.event?.id };
      case "recommendations":
        return { reportId: item?.id, contentId: item?.crowdSource?.id };
      case "comments":
        return { reportId: item?.id, contentId: item?.comment?.id };
      case "reviews":
        return {
          reportId: item?.id,
          contentId: item?.reviewId ?? item?.review?.id,
        };
      default:
        return { reportId: item?.id, contentId: undefined };
    }
  };

  const handleMarkReviewed = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    const { reportId } = getActionIds(selectedItem);
    const res = await reportService.markReportReviewed(
      activeTab as "events" | "recommendations" | "comments" | "reviews",
      reportId
    );
    if (!res.success) {
      setError(res.error as string);
    }
    // refetch current tab
    if (activeTab === "events") fetchEvents(currentPage);
    if (activeTab === "recommendations") fetchRecommendations(currentPage);
    if (activeTab === "comments") fetchComments(currentPage);
    if (activeTab === "reviews") fetchReviews(currentPage);
    setActionLoading(false);
  };

  const handleRemoveContent = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    const { reportId } = getActionIds(selectedItem);
    if (!reportId) {
      setError("Missing content id for removal");
      setActionLoading(false);
      return;
    }
    const res = await reportService.removeReportedContent(
      activeTab as "recommendations" | "comments" | "reviews",
      reportId
    );
    if (!res.success) {
      setError(res.error as string);
    }
    // refetch current tab
    if (activeTab === "recommendations") fetchRecommendations(currentPage);
    if (activeTab === "comments") fetchComments(currentPage);
    if (activeTab === "reviews") fetchReviews(currentPage);
    setActionLoading(false);
  };

  const tabs = [
    { id: "events", label: "Events" },
    { id: "recommendations", label: "Recommendations" },
    { id: "comments", label: "Comments" },
    { id: "reviews", label: "Reviews" },
  ];

  const fetchRecommendations = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedRecommendations(
      page,
      limit,
      debouncedSearch,
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

  const fetchComments = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedComments(
      page,
      limit,
      debouncedSearch,
      startDate,
      endDate,
      status
    );

    if (response.success) {
      setComments(response.data?.reports || []);
      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
    } else {
      setError(response.error as string);
    }

    setLoading(false);
  };

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    setError(null);

    const response = await reportService.getReportedReviews(
      page,
      limit,
      debouncedSearch,
      startDate,
      endDate,
      status
    );

    if (response.success) {
      setReviews(response.data?.reports || []);
      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
    } else {
      setError(response.error as string);
    }

    setLoading(false);
  };

  // Fetch on page load and when filters change for ACTIVE TAB ONLY
  useEffect(() => {
    if (activeTab === "events") {
      fetchEvents(1);
    } else if (activeTab === "recommendations") {
      fetchRecommendations(1);
    } else if (activeTab === "comments") {
      fetchComments(1);
    } else if (activeTab === "reviews") {
      fetchReviews(1);
    }
  }, [activeTab, debouncedSearch, startDate, endDate, status]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Initialize pending filter values when opening the modal
  useEffect(() => {
    if (showFilter) {
      setPendingStatus(status);
      setPendingStartDate(startDate);
      setPendingEndDate(endDate);
    }
  }, [showFilter]);

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
            {activeTab === "events"
              ? "Event Reports"
              : activeTab === "recommendations"
              ? "Recommendations Reports"
              : activeTab === "comments"
              ? "Comments Reports"
              : activeTab === "reviews"
              ? "Reviews Reports"
              : "Reports"}
          </h3>
          <p className="text-[#D45815] font-semibold text-[1rem]">
            (
            {activeTab === "events"
              ? events.length
              : activeTab === "recommendations"
              ? recommendations.length
              : activeTab === "comments"
              ? comments.length
              : activeTab === "reviews"
              ? reviews.length
              : 0}
            )
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
                placeholder={
                  activeTab === "events"
                    ? "Search by event name, reporter or reason"
                    : activeTab === "recommendations"
                    ? "Search by place/event name, reporter or reason"
                    : activeTab === "comments"
                    ? "Search by comment text, reporter or reason"
                    : activeTab === "reviews"
                    ? "Search by review text, reporter or reason"
                    : "Search"
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 w-full outline-none text-sm placeholder:text-[#7B7B7B]"
              />
            </div>

            {/* Filter BUTTON (future use for startDate/endDate/status) */}
            <button
              className="border border-[#D0D0D0] px-[12px] py-[8px] flex items-center gap-[12px] rounded-[8px]"
              type="button"
              onClick={() => setShowFilter(true)}
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

        {showFilter && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white w-[520px] rounded-[12px] shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[1.125rem] font-semibold text-[#1D1D1E]">
                  Filter By
                </h4>
                <button onClick={() => setShowFilter(false)}>
                  <X className="w-5 h-5 text-[#7B7B7B]" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#272727]" htmlFor="status-select">
                    Status
                  </label>
                  <select
                    id="status-select"
                    title="Filter status"
                    className="border border-[#D0D0D0] rounded-md px-3 py-2 text-[#7B7B7B]"
                    value={pendingStatus ?? "ALL"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPendingStatus(val === "ALL" ? undefined : val);
                    }}
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWED">Reviewed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#272727]">Date Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="start-date" className="sr-only">
                        Start date
                      </label>
                      <input
                        id="start-date"
                        type="date"
                        aria-label="Start date"
                        className="border border-[#D0D0D0] rounded-md px-3 py-2 text-[#272727]"
                        value={pendingStartDate ?? ""}
                        onChange={(e) => setPendingStartDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="end-date" className="sr-only">
                        End date
                      </label>
                      <input
                        id="end-date"
                        type="date"
                        aria-label="End date"
                        className="border border-[#D0D0D0] rounded-md px-3 py-2 text-[#272727]"
                        value={pendingEndDate ?? ""}
                        onChange={(e) => setPendingEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  className="w-full bg-[#2853A6] text-white py-3 rounded-md disabled:bg-[#C8D0E8]"
                  onClick={() => {
                    setStatus(pendingStatus);
                    setStartDate(pendingStartDate);
                    setEndDate(pendingEndDate);
                    setShowFilter(false);
                  }}
                >
                  Apply Filter
                </button>
                <button
                  className="w-full border border-[#CB1A14] text-[#CB1A14] py-3 rounded-md"
                  onClick={() => {
                    setPendingStatus(undefined);
                    setPendingStartDate(undefined);
                    setPendingEndDate(undefined);
                    setStatus(undefined);
                    setStartDate(undefined);
                    setEndDate(undefined);
                    setShowFilter(false);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

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
                        <button
                          type="button"
                          aria-label="Open actions"
                          onClick={(e) => openActions(event, e)}
                        >
                          <BsThreeDotsVertical color="#303237" size={24} />
                        </button>
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
                  Loading reported recommendations...
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
                        <button
                          type="button"
                          aria-label="Open actions"
                          onClick={(e) => openActions(recommendation, e)}
                        >
                          <BsThreeDotsVertical color="#303237" size={24} />
                        </button>
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
          {activeTab === "comments" && (
            <>
              {/* LOADING */}
              {loading && (
                <div className="h-[200px] flex items-center justify-center text-[#303237]">
                  Loading reported comments...
                </div>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-center py-4">{error}</p>
              )}

              {/* EMPTY */}
              {!loading && comments.length === 0 && (
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
                        No reported comments yet
                      </h2>
                      <p className="text-[#7E8494]">
                        Parents have not reported any comments. Reported
                        comments will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS GRID */}
              {!loading && comments.length > 0 && (
                <div className="p-[24px] grid grid-cols-2 gap-[28px]">
                  {comments.map((comment: any) => (
                    <div
                      key={comment.id}
                      className="border border-[#F4F5F8] rounded-[12px] shadow p-[20px] flex flex-col gap-[16px]"
                    >
                      <div className="flex justify-between">
                        <h3 className="text-[#303237] font-semibold text-[1.25rem]">
                          {comment.comment?.content ||
                            comment.comment?.text ||
                            comment.comment?.body ||
                            comment.target?.name ||
                            comment.post?.title ||
                            "Comment"}
                        </h3>
                        <button
                          type="button"
                          aria-label="Open actions"
                          onClick={(e) => openActions(comment, e)}
                        >
                          <BsThreeDotsVertical color="#303237" size={24} />
                        </button>
                      </div>

                      <div className="flex items-center gap-[12px]">
                        <p className="text-[#565C69] text-[.875rem]">
                          Reported by {comment.reporter?.name || "Unknown"}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className="text-[#565C69] text-[.875rem]">
                          {getFormatedDate(comment.createdAt)}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className={getStatusBadge(comment.status)}>
                          {comment.status}
                        </p>
                      </div>

                      <div className="flex items-center gap-[16px]">
                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reason
                          </h3>
                          <p className="text-[#CB1A14]">{comment.reason}</p>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reported user/vendor
                          </h3>
                          <p className="text-[#303237]">
                            {comment.comment?.author?.name ||
                              comment.comment?.user?.name ||
                              (comment.comment?.user?.first_name &&
                              comment.comment?.user?.last_name
                                ? `${comment.comment?.user?.first_name} ${comment.comment?.user?.last_name}`
                                : "Unknown")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeTab === "reviews" && (
            <>
              {/* LOADING */}
              {loading && (
                <div className="h-[200px] flex items-center justify-center text-[#303237]">
                  Loading reported reviews...
                </div>
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-center py-4">{error}</p>
              )}

              {/* EMPTY */}
              {!loading && reviews.length === 0 && (
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
                        No reported reviews yet
                      </h2>
                      <p className="text-[#7E8494]">
                        Parents have not reported any reviews. Reported reviews
                        will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULTS GRID */}
              {!loading && reviews.length > 0 && (
                <div className="p-[24px] grid grid-cols-2 gap-[28px]">
                  {reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="border border-[#F4F5F8] rounded-[12px] shadow p-[20px] flex flex-col gap-[16px]"
                    >
                      <div className="flex justify-between">
                        <h3 className="text-[#303237] font-semibold text-[1.25rem]">
                          {review.review?.event?.name ||
                            review.review?.comment ||
                            "Review"}
                        </h3>
                        <button
                          type="button"
                          aria-label="Open actions"
                          onClick={(e) => openActions(review, e)}
                        >
                          <BsThreeDotsVertical color="#303237" size={24} />
                        </button>
                      </div>

                      <div className="flex items-center gap-[12px]">
                        <p className="text-[#565C69] text-[.875rem]">
                          Reported by {review.reporter?.name || "Unknown"}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className="text-[#565C69] text-[.875rem]">
                          {getFormatedDate(review.createdAt)}
                        </p>
                        <RxDotFilled color="#565C69" size={12} />
                        <p className={getStatusBadge(review.status)}>
                          {review.status}
                        </p>
                      </div>

                      <div className="flex items-center gap-[16px]">
                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reason
                          </h3>
                          <p className="text-[#CB1A14]">{review.reason}</p>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="text-[#7E8494] text-[.875rem]">
                            Reported user/vendor
                          </h3>
                          <p className="text-[#303237]">
                            {review.review?.name ||
                              review.review?.author?.name ||
                              review.review?.user?.name ||
                              (review.review?.user?.first_name &&
                              review.review?.user?.last_name
                                ? `${review.review?.user?.first_name} ${review.review?.user?.last_name}`
                                : "Unknown")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      {/* Actions Modal */}
      <ActionModal
        open={showActions}
        onClose={closeActions}
        onMarkReviewed={handleMarkReviewed}
        onRemoveContent={handleRemoveContent}
        showRemove={activeTab !== "events"}
        anchor={actionsAnchor}
      />

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

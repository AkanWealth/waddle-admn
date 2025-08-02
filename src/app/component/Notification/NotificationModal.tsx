/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import EmptyNotification from "./EmptyNotification";
import NotificationItem from "./NotificationItem";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/utils/notificationService";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

// Define types for our component
interface NotificationType {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

interface MetaType {
  hasNextPage: boolean;
  total: number;
}

interface NotificationResponseData {
  data: NotificationType[];
  meta: MetaType;
}

// Custom hook for auto-marking notifications as read
const useAutoMarkAsRead = (
  adminId: string,
  onNotificationRead: (notificationId: string) => void
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const observedElementsRef = useRef<Map<string, Element>>(new Map());

  // Mark notification as read function
  const markNotificationAsRead = useCallback(
    async (notificationId: string) => {
      console.log("mARKING")
      try {
        const { success } = await notificationService.markAsRead(
          adminId,
          notificationId
        );
        if (success) {
          onNotificationRead(notificationId);
          console.log(`Notification ${notificationId} marked as read`);
        }
      } catch (error) {
        console.error(
          `Error marking notification ${notificationId} as read:`,
          error
        );
      }
    },
    [adminId, onNotificationRead]
  );

  // Initialize intersection observer
  useEffect(() => {
    if (!adminId) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const notificationId = entry.target.getAttribute(
            "data-notification-id"
          );
          if (!notificationId) return;

          if (entry.isIntersecting) {
            // Notification is visible - start 2-second timer
            if (!timeoutsRef.current.has(notificationId)) {
              const timeout = setTimeout(() => {
                markNotificationAsRead(notificationId);
                // Clean up after marking as read
                timeoutsRef.current.delete(notificationId);
                observedElementsRef.current.delete(notificationId);
              }, 2000); // 2 seconds delay

              timeoutsRef.current.set(notificationId, timeout);
            }
          } else {
            // Notification is no longer visible - cancel timer
            const timeout = timeoutsRef.current.get(notificationId);
            if (timeout) {
              clearTimeout(timeout);
              timeoutsRef.current.delete(notificationId);
            }
          }
        });
      },
      {
        // Trigger when 50% of the notification is visible
        threshold: 0.5,
        // Add some margin to ensure notification is properly in view
        rootMargin: "-10px 0px -10px 0px",
      }
    );

    return () => {
      // Cleanup on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      // Clear all timeouts
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
      observedElementsRef.current.clear();
    };
  }, [adminId, markNotificationAsRead]);

  // Function to observe a notification element
  const observeNotification = useCallback(
    (element: Element, notificationId: string, isRead: boolean) => {
      if (!observerRef.current || !element || isRead) return;

      // Don't observe if already observing this notification
      if (observedElementsRef.current.has(notificationId)) return;

      element.setAttribute("data-notification-id", notificationId);
      observerRef.current.observe(element);
      observedElementsRef.current.set(notificationId, element);
    },
    []
  );

  // Function to stop observing a notification element
  const unobserveNotification = useCallback((notificationId: string) => {
    if (!observerRef.current) return;

    const element = observedElementsRef.current.get(notificationId);
    if (element) {
      observerRef.current.unobserve(element);
      observedElementsRef.current.delete(notificationId);
    }

    // Clear any pending timeout
    const timeout = timeoutsRef.current.get(notificationId);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(notificationId);
    }
  }, []);

  // Function to clean up all observations (useful when notifications list changes)
  const cleanupObservations = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Clear all timeouts
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current.clear();
    observedElementsRef.current.clear();

    // Recreate observer for new notifications
    if (observerRef.current && adminId) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const notificationId = entry.target.getAttribute(
              "data-notification-id"
            );
            if (!notificationId) return;

            if (entry.isIntersecting) {
              if (!timeoutsRef.current.has(notificationId)) {
                const timeout = setTimeout(() => {
                  markNotificationAsRead(notificationId);
                  timeoutsRef.current.delete(notificationId);
                  observedElementsRef.current.delete(notificationId);
                }, 2000);

                timeoutsRef.current.set(notificationId, timeout);
              }
            } else {
              const timeout = timeoutsRef.current.get(notificationId);
              if (timeout) {
                clearTimeout(timeout);
                timeoutsRef.current.delete(notificationId);
              }
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-10px 0px -10px 0px",
        }
      );
    }
  }, [markNotificationAsRead, adminId]);

  return {
    observeNotification,
    unobserveNotification,
    cleanupObservations,
  };
};

const NotificationModal = () => {
  // Use type assertion for useAuth since it's imported from a JS file
  const { user } = useAuth() as { user: { admin: { id: string } } };
  const adminId = user?.admin?.id;
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [meta, setMeta] = useState<MetaType | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const notificationModalRef = useRef<HTMLDivElement>(null);

  const LIMIT = 10;

  // Initialize auto mark as read functionality
  const { observeNotification, cleanupObservations } = useAutoMarkAsRead(
    adminId,
    (notificationId) => {
      // Update local state when notification is marked as read
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
    }
  );

  // Clean up observations when notifications change
  useEffect(() => {
    cleanupObservations();
  }, [notifications.length, activeTab, cleanupObservations]);

  // Polling for real-time updates (since we're using external API)
  const pollForUpdates = useCallback(() => {
    if (!adminId) return;

    const pollInterval = setInterval(async () => {
      // Only check for new notifications on the first page
      const { success, data } =
        await notificationService.getPaginatedNotifications({
          adminId,
          includeRead: "false", // Only check for new unread notifications
          includeCleared: "false",
          limit: "5", // Check just a few recent ones
          offset: "0",
        });

      if (success && data) {
        const responseData = data as NotificationResponseData;
        const newNotifications = responseData.data;

        if (activeTab === "unread") {
          setNotifications((prev) => {
            const existingIds = new Set(prev.map((n) => n.id));
            const actuallyNew = newNotifications.filter(
              (n) => !existingIds.has(n.id)
            );
            return [...actuallyNew, ...prev];
          });

          // Update meta
          if (newNotifications.length > 0) {
            setMeta((prev) =>
              prev
                ? {
                    ...prev,
                    total:
                      prev.total +
                      newNotifications.filter(
                        (n) =>
                          !notifications.some(
                            (existing) => existing.id === n.id
                          )
                      ).length,
                  }
                : null
            );
          }
        }
      }
    }, 30000); // Poll every 30 seconds

    return pollInterval;
  }, [adminId, notifications]);

  // Initialize on mount and when adminId changes
  useEffect(() => {
    if (!adminId) return;

    resetAndLoadNotifications();

    // Start polling for updates
    const pollInterval = pollForUpdates();

    // Cleanup on unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [adminId]);

  // Reset and reload when tab changes
  useEffect(() => {
    console.log("This ran well");
    if (!adminId) return;
    console.log("Another here");
    resetAndLoadNotifications();
  }, [activeTab]);

  const resetAndLoadNotifications = async () => {
    setNotifications([]);
    setOffset(0);
    setMeta(null);
    setInitialLoading(true);
    await loadNotifications(0);
    setInitialLoading(false);
  };

  const loadNotifications = async (customOffset = offset) => {
    // setLoading(false);
    // if (loading || (meta && !meta.hasNextPage)) return;
    setLoading(true);
    console.log("Resetting notifications");

    try {
      const { success, data } =
        await notificationService.getPaginatedNotifications({
          adminId,
          includeRead: activeTab === "all" ? "true" : "false",
          includeCleared: "false",
          limit: LIMIT.toString(),
          offset: customOffset.toString(),
        });

      if (success && data) {
        const responseData = data as NotificationResponseData;

        setNotifications((prev) => {
          if (customOffset === 0) {
            return responseData.data;
          }

          return [...prev, ...responseData.data];
        });

        setMeta(responseData.meta);
        setOffset(customOffset + LIMIT);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Improved scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !meta?.hasNextPage || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollThreshold = 100; // Load when 100px from bottom

    if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
      loadNotifications();
    }
  }, [meta?.hasNextPage, loading, activeTab]);

  // Throttled scroll handler
  const throttledHandleScroll = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };
  }, [handleScroll]);

  const handleNotificationMenuClick = () => {
    setShowNotificationMenu((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationModalRef.current &&
      !notificationModalRef.current.contains(event.target as Node)
    ) {
      setShowNotificationMenu(false);
    }
  };

  const handleTabChange = (tab: "all" | "unread") => {
    if (tab === activeTab) return;
    setNotifications([]); // <--- Reset before setting tab
    setActiveTab(tab);
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Since we don't have a mark all as read endpoint, we'll just update locally
      // You can implement this when the external API provides the endpoint
      const { success } = await notificationService.markAllAsRead(adminId);
      if (success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setShowNotificationMenu(false);
      }

      // Optional: Show a message that this is a local update only
      console.log("Marked all as read (local update only)");
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      // Since we don't have a clear all endpoint, we'll just update locally
      // You can implement this when the external API provides the endpoint
      const {success}= await notificationService.clearAll(adminId);
      if(success){
        setNotifications([]);
        setMeta(null);
        setShowNotificationMenu(false);
      }
      

      // Optional: Show a message that this is a local update only
      console.log("Cleared all notifications (local update only)");
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") {
      // Check for various possible "unread" values
      const isUnread = !notification.isRead || notification.isRead === false;
      // notification.isRead === "false";

      // Debug logging (remove this after fixing)
      // if (notifications.length > 0 && filteredNotifications.length === 0) {
      //   console.log("Filtering debug:", {
      //     notificationId: notification.id,
      //     isRead: notification.isRead,
      //     isReadType: typeof notification.isRead,
      //     isUnread: isUnread,
      //     activeTab: activeTab,
      //   });
      // }

      return isUnread;
    }
    return true; // Show all for "all" tab
  });

  // Count unread notifications (check for various possible "unread" values)
  const unreadCount = notifications.filter(
    (n) => !n.isRead || n.isRead === false
  ).length;

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: { opacity: 0, y: 20 },
  };

  if (initialLoading) {
    return (
      <motion.section
        className="relative flex flex-col h-[600px] w-full items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={modalVariants}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A379A]"></div>
          <p className="text-[#303237] text-sm">Loading notifications...</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="relative flex flex-col h-[600px] w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
    >
      {/* Header */}
      <div className="flex flex-col border-b py-4 gap-2.5">
        <div className="flex px-4 items-center justify-between">
          <h3 className="text-[#303237] text-[20px] font-semibold">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <motion.div
              className="bg-[#C2F0CD] px-2 py-1 rounded-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <p className="text-[#1E9A64] font-medium text-[13px]">
                {unreadCount} unread
              </p>
            </motion.div>
          )}
        </div>

        <div className="flex px-4 items-center justify-between">
          <div className="bg-[#E5E7EF] p-2 rounded-[8px] flex space-x-2">
            <motion.button
              className={`px-[10px] py-[3.5px] rounded-[4px] text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "!bg-[#1A379A] text-white"
                  : "bg-inherit text-[#1A379A]"
              }`}
              onClick={() => handleTabChange("all")}
              whileTap={{ scale: 0.95 }}
              whileHover={
                activeTab !== "all" ? { backgroundColor: "#E0E3F0" } : {}
              }
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              All
            </motion.button>
            <motion.button
              className={`px-[10px] py-[3.5px] rounded-[4px] text-sm font-medium transition-colors ${
                activeTab === "unread"
                  ? "!bg-[#1A379A] text-white"
                  : "bg-inherit text-[#1A379A]"
              }`}
              onClick={() => handleTabChange("unread")}
              whileTap={{ scale: 0.95 }}
              whileHover={
                activeTab !== "unread" ? { backgroundColor: "#E0E3F0" } : {}
              }
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Unread 
            </motion.button>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <HiDotsVertical
              onClick={handleNotificationMenuClick}
              className="text-[#404040] h-[24px] w-[24px] cursor-pointer"
            />
          </motion.div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showNotificationMenu && (
            <motion.div
              ref={notificationModalRef}
              className="absolute flex flex-col gap-2 top-[120px] bg-white py-2 border border-[#E5E7EF] right-5 z-50 rounded-[20px] shadow-lg"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.button
                className="text-[#303237] cursor-pointer flex items-center px-3 py-1.5 gap-2 rounded-lg"
                onClick={handleMarkAllAsRead}
                whileHover={{ backgroundColor: "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
                disabled={unreadCount === 0}
              >
                <CiCircleCheck className="h-[18px] w-[18px]" />
                <span className="text-[14px] font-medium">
                  Mark all as read
                </span>
              </motion.button>
              <hr className="mx-2" />
              <motion.button
                className="text-[#CC0000] cursor-pointer flex items-center px-3 py-1.5 gap-2 rounded-lg"
                onClick={handleClearAll}
                whileHover={{ backgroundColor: "#fff5f5" }}
                whileTap={{ scale: 0.98 }}
                disabled={notifications.length === 0}
              >
                <FaRegTrashAlt className="h-[18px] w-[18px]" />
                <span className="text-[14px] font-medium">Clear all</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable Notification Content */}
      <div
        ref={containerRef}
        onScroll={throttledHandleScroll()}
        className="flex-1 overflow-y-auto px-4 pb-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EmptyNotification />
          </motion.div>
        ) : (
          <motion.div
            className="w-full mx-auto mt-4 bg-white rounded-lg divide-y"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 100,
                  }}
                  layout
                  ref={(el) => {
                    // Only observe unread notifications
                    if (el && !notification.isRead) {
                      observeNotification(
                        el,
                        notification.id,
                        notification.isRead
                      );
                    }
                  }}
                >
                  <NotificationItem
                    title={notification.title}
                    description={notification.body}
                    date={new Date(notification.createdAt).toDateString()}
                    timeAgo={formatDistanceToNow(
                      new Date(notification.createdAt),
                      {
                        addSuffix: true,
                      }
                    )}
                    isRead={notification.isRead}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {loading && (
              <motion.div
                className="flex items-center justify-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1A379A]"></div>
                  <span className="text-sm text-gray-500">Loading more...</span>
                </div>
              </motion.div>
            )}

            {/* End of list indicator */}
            {meta && !meta.hasNextPage && filteredNotifications.length > 0 && (
              <motion.div
                className="text-center py-4 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                You&apos;ve reached the end
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default NotificationModal;
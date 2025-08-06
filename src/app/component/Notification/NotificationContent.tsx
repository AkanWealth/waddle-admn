import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationContent = () => {
  return (
    <div className="overflow-y-auto w-full  mx-auto mt-10 bg-white rounded-lg shadow-md divide-y">
      <NotificationItem
        title="Event Rejected"
        description='Your event "Music Workshop" was not approved due to non-compliance with platform guidelines. Click to view details and required changes.'
        date="Jan 21, 2025"
        timeAgo="10 mins ago"
        isRead={false}

      />
      <NotificationItem
        title="Event Canceled"
        description='The event "Art for Kids" scheduled for March 20, 2025, has been canceled by the organiser. A refund process has been initiated for affected attendees.'
        date="Jan 21, 2025"
        timeAgo="10 mins ago"
        isRead={false}
      />
    </div>
  );
};

export default NotificationContent;

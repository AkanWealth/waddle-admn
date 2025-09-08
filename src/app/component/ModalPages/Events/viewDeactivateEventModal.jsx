"use client";

import React, { useState } from "react";
import BaseModal from "../../Element/BaseModal";
import StatusBadge from "../../EventManagement/StatusBadge";
import { InfoIcon, Clock, CalendarDays, MapPin, Clock3, User, Banknote, Tag, CircleCheck } from "lucide-react";
import DeleteEventModal from "./DeleteEventModal";
import EventCreationModal from "./createEventModal";
import splitDoubleUrl, { splitInstructions } from "@/lib/splitDoubleUrl";
import formatCustomDate from "@/lib/formatDate";
import Image from "next/image";
/**
 * eventApproveDetailsModal - Component for displaying event details in a modal
 *
 * @param {Object} props
 * @param {Object} props.event - event data object
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Function to call when modal closes
 * @param {function} props.onApprove - Function to handle event approval
 * @param {function} props.onReject - Function to handle event rejection
 */
const EventApproveDetailsModal = ({
  event,
  isOpen,
  onClose,
  onDelete,
  onReject,
}) => {
  // If no event is selected, don't render the modal
  if (!event) return null;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  console.log(event, "This is our event really")

  // Determine if status is "Pending" to show action buttons
  const isnotActive = event.status == "NON_COMPLIANT";
  const isDeactivated = event.status == "DRAFT";

  // Determine button actions based on event status
  const getActions = () => {
    console.log(isnotActive || isDeactivated, "This is it")
    if (isnotActive || isDeactivated) {
      return {
        reject: {
          label: "Edit Event",
          onClick: () => {
            setEventToEdit(event);
            setEditModalOpen(true);
            onClose();
          },
          className:
            "border border-[#2853A6] text-[#2853A6] font-medium py-2 px-4 rounded w-full",
        },
        approve: {
          label: "Delete Event",
          onClick: () => openActivateModal(event),
          className:
            "bg-[#CC0000] cursor-pointer hover:bg-red-700 text-white font-medium py-2 px-4 rounded w-full",
        },
      };
    } else if (event.status === "APPROVED" || event.status === "Active") {
      return {  
        suspend: {
          label: "Delete Event",
          onClick: () => openActivateModal(event), // <-- Open the suspend modal
          className:
            "bg-[#CC0000] cursor-pointer text-white font-medium py-2 px-4 rounded w-full",
        },
        // cancel: {
        //   label: "Edit Event",
        //   onClick: () => {
        //     setEventToEdit(event);
        //     setEditModalOpen(true);
        //     onClose();
        //   },
        //   className:
        //     "border border-blue-600 text-blue-600  font-medium py-2 px-4 rounded w-full",
        // },
      };
    } else {
      return {
        close: {
          label: "Close",
          onClick: onClose,
          className:
            "border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded",
        },
      };
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  console.log("The event i am looking at", event);
  const realVendorImage = event?.organiser?.business_logo? `https://waddleapp-bucket.s3.eu-north-1.amazonaws.com/vendors/${event.organiser.business_logo}` : null


  const eventData = {
   
    details: [
      { label: "Date", value: "14th February 2024", icon: "calendar" },
      { label: "Time", value: "8am - 2pm", icon: "clock" },
      { label: "Location", value: "Wivehoe, 6 miles away", icon: "location" },
      { label: "Age Range", value: "2-10 years old", icon: "person" },
      { label: "Price", value: "£20/person", icon: "money" },
    ],
  };
  //     organizer: {
  //       name: "Aura Jean",
  //       company: "Chef Food Limited",
  //       email: "aurajean@cheffood.com",
  //       phone: "+4498274774",
  //     },
  //     images: [
  //       { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
  //       { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
  //       { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
  //       { name: "Thrive in Uncertain...", size: "200kb", url: "/editImage.jpg" },
  //     ],
  //     status: "Pending", // This would come from props
  //   };

  const mergedEvent = { ...eventData, ...event };
  console.log("Event Data:", mergedEvent.images);
  const processedImages = splitDoubleUrl(mergedEvent.images);
  const processedInstructions = splitInstructions(mergedEvent.instruction);
  const handleSuspendevent = (eventId, reason) => {
    // Your suspension logic here
    console.log(`Suspending event ${eventId}: ${reason}`);
  };

  // When you want to open the modal
  const openSuspendModal = (event) => {
    if (onClose) onClose(); // Close the approve modal
    setSelectedevent(event);
    setSuspendModalOpen(true);
  };
  const openActivateModal = (event) => {
    console.log(event, 'This is our modal')
    // setSelectedevent(event);
    setDeleteModalOpen(true); // Open activate modal
    
    // if (onClose) onClose(); // Close the approve modal

  };
  const openEnableModal = (event) => {
    if (onClose) onClose(); // Close the approve modal
    setSelectedevent(event);
    setEnableModalOpen(true); // Open enable modal
  };

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "calendar":
        return <CalendarDays className="text-[#8B8B8B] h-[20px] w-[20px] mr-2"/>;
      case "clock":
        return <Clock3 className="text-[#8B8B8B] h-[20px] w-[20px] mr-2" />;
      case "location":
        return <MapPin className="text-[#8B8B8B] h-[20px] w-[20px] mr-2" />;
      case "person":
        return <User className="text-[#8B8B8B] h-[20px] w-[20px] mr-2" />;
      case "money":
        return <Banknote className="text-[#8B8B8B] h-[20px] w-[20px] mr-2"/>
      default:
        return null;
    }
  };

  // Title for the modal based on status
  const modalTitle = "Event Details";

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        actions={getActions()}
        buttonPlacement={
          event.status === "Approved" ||
          event.status === "Active" ||
          event.status === "Inactive" ||
          event.status === "Deactivated"
            ? "bottom"
            : "bottom"
        }
        size={{ width: "99%", maxWidth: "800px" }}
        className="overflow-y-auto"
        showDividers={false}
      >
        <div>
          {/* Last Login Information */}
          {/* {(event.status === "Non-compliant" || event.status === "non-compliant") && (
                    <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-gray-800">{event.name}</h3>
                    <StatusBadge status={event.status} />
                </div>
                )} */}
          {/* {(event.status === "Inactive") && ( */}
          <div className="mb-4 text-sm text-gray-700">
            <div className="flex items-center mb-2">
              <InfoIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-gray-700">
                Only events with no registered attendees can be deleted.
              </span>
            </div>
            {/* <p></p> */}
          </div>
          {/* )} */}

          {/* Status badge and event name section */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium text-gray-800">{event.name}</h3>
            <StatusBadge status={event.status} />
          </div>

          <div className="space-y-6">
            {/* Status Badge - Top right corner */}
            <div className="flex justify-end items-center mb-4 mt-2">
              {/* <button
        onClick={onEdit}
        className="text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-50"
    >
        Edit Event
    </button> */}
              {/* <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200">
                            <span className="mr-1"><Clock className='w-4 h-4 text-gray-500 mr-1' /></span> Pending
                        </span>
                    </div> */}
            </div>

            {/* Event Title and Description */}
            <section>
              <h2 className="text-xl font-semibold">{mergedEvent.title}</h2>
              <p className="text-gray-700 whitespace-pre-line mt-2">
                {mergedEvent.description}
              </p>
            </section>
            <hr className="border-gray-300 mb-6" />
            {/* Safety Measures */}
            {
              mergedEvent.instruction &&
              <>
              <section>
              <h3 className="text-base text-[#565C69] font-medium mb-2">Helpful Information</h3>
              <div className="flex flex-wrap gap-2">
                {processedInstructions.map((measure, index) => (
                  <div
                    key={index}
                    className="bg-[#FFF4D7] text-[#404040] px-4 py-2 rounded-full"
                  >
                    {measure}
                  </div>
                ))}
              </div>
            </section>
            <hr className="border-gray-300 mb-6" />
              </>
            }
            

            {/* Event Details */}
            <section className="space-y-2">
              <div className="flex items-center">
                {renderIcon("calendar")}
                <span className="text-[#565C69]">
                    {formatCustomDate(mergedEvent.date, "Do MMMM YYYY")}
                </span>
                
              </div>
              <div className="flex items-center">
                {renderIcon("clock")}
                <span className="text-[#565C69]">{mergedEvent.time}</span>
              </div>
              <div className="flex items-center">
                {renderIcon("location")}
                <span className="text-[#565C69]">{mergedEvent.address}</span>
              </div>
              <div className="flex items-center">
                {renderIcon("person")}
                <span className="text-[#565C69]">{mergedEvent.age_range}</span>
              </div>
              <div className="flex items-center">
                {renderIcon("money")}
                <span className="text-[#565C69]">{`£${mergedEvent.price}/person`}</span>
              </div>
              {console.log(mergedEvent, "This is the merged event")}
              <section className="flex items-center gap-[24px]">
                <div className="flex items-center gap-2">
                  {mergedEvent?.tags.map(item=>(
                    <span key={item} className="bg-[#EAEEF6] text-[#2853A6] rounded-[8px] py-1 px-2">{item}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-[17px] w-[17px] text-[#D45815]" />
                  <p className="text-[#606161] text-[16px]">
                    {mergedEvent.eventType=="INDOOR" ? "Indoor": "Outdoor"}
                  </p>
                </div>
              </section>
              <section className="my-[9px] flex flex-col gap-1">
                <h3 className="text-[#1D1D1E] font-bold">Facilities</h3>
                <div className="flex items-center gap-6">
                  {
                    mergedEvent?.facilities?.map(item=>(
                      <div className="flex items-center gap-2">
                        <CircleCheck className="text-[#303237] h-[16px] w-[16px]" />
                        <p className="text-[#565C69]">
                          {item}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </section>
            </section>
            <hr className="border-gray-300 mb-6" />
            {/* Organizer */}
            <section>
              <h3 className="text-lg font-medium mb-2">Organiser</h3>
              <div className="flex items-start">
                <img src={event?.admin?.avatarUrl || realVendorImage || "/Avatar.jpg"} alt="Organizer" className="rounded-full w-12 h-12" />
                <div className="space-y-1">
                  <p className="font-medium">
                    {console.log(event, "This approve details is for organiser")}
                    {console.log(event.admin, "This one is admin")}
                    {mergedEvent.organiser?.name ||
                      `${mergedEvent.admin?.first_name ?? ""} ${
                        mergedEvent.admin?.last_name ?? ""
                      }`.trim()}
                  </p>
                  <p className="text-gray-700">
                    {mergedEvent.organiser?.company}
                    {/* We are coming back */}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <div className="flex items-center">
                      <span className="mr-1">✉️</span>
                      <a
                        href={`mailto:${
                          mergedEvent.organiser?.email ||
                          mergedEvent.admin?.email
                        }`}
                        className="text-blue-600 hover:underline"
                      >
                        <p>
                          {mergedEvent.organiser?.email ||
                            `${mergedEvent.admin?.email ?? ""} `.trim()}
                        </p>
                      </a>
                    </div>
                    {
                      mergedEvent.organiser?.phone && 
                       <div className="flex items-center">
                      <span className="mr-1">📞</span>
                      <span>
                        {mergedEvent.organiser?.phone ||
                          `${mergedEvent.admin?.phone ?? ""} `.trim()}
                      </span>
                    </div>
                    }
                   
                  </div>
                </div>
              </div>
            </section>

            {/* Images */}
            {/* <section>
              <h3 className="text-lg font-medium mb-2">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {processedImages.map((image, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="bg-gray-200 h-16 w-full object-cover mb-2 rounded"
                    />
                    <p className="text-sm truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">{image.size}</p>
                  </div>
                ))}
              </div>
            </section> */}

{
 mergedEvent.files && 
            <section className="">
              <h3 className="text-[#303237] font-semibold">Images</h3>
              <div className="flex  gap-4 mt-4">
                {
                  mergedEvent.files.map(imageUrl=>(
                    <div className="flex rounded-[8px] bg-[#F4F5F8] px-1 py-2 gap-2">
                      <Image src={imageUrl} alt="Image links" width={60} height={40} unoptimized />
                      <div className="hidden">
                        <h3 className="text-[12px] font-medium">
                          Thrive in... 
                        </h3>
                        <p className="text-[10px] text-[#7E8494] font-medium">200kb</p>
                      </div>
                    </div>
                  ))
                }
                
              </div>
            </section>
}
            {/* <div className="mt-10 flex justify-center space-x-4">
        <button
            onClick={onReject}
            className="px-6 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
        >
            Reject
        </button>
        <button
            onClick={onApprove}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Approve
        </button>
    </div> */}
          </div>
          {/* Contact name */}
          {/* <p className="text-gray-600 mb-4">{event.contactName || "Mary White"}</p> */}

          {/* Description */}
          {/* <p className="text-gray-700 mb-6">
                    {event.description || "Designed to teach and train family both parents and children to communicate effectively. Bring your kids let us train them to be professional from foundation."}
                </p> */}

          {/* Contact Details Section */}
          {/* <h4 className="text-lg font-medium text-gray-800 mb-4">Contact Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* <div className="flex flex-col-2 gap-4"> */}
          {/* Phone 
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {event.contactDetails?.phone || "+4498274774"}
                        </span>
                    </div>

                    {/* Email 
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {event.contactDetails?.email || "mary@abcorg.com"}
                        </span>
                    </div>

                    {/* Address if available 
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {event.contactDetails?.address || "362 Sycamore St, Detroit, MI"}
                        </span>
                    </div>

                    {/* Website if available 
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <span className="text-gray-700">
                            {event.contactDetails?.website || "www.abcorg.com"}
                        </span>
                    </div>
                    {/* </div> 
                </div> */}

          {/* Event Details Section for Approved/Active events */}
          {/* {(event.status === "Approved" || event.status === "Active" || event.status === "Inactive") && (
                    <>
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Event Details</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Total Events Created:</div>
                                    <div className="font-medium">12</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Upcoming Events:</div>
                                    <div className="font-medium">3</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Past Events:</div>
                                    <div className="font-medium">9</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Total Attendees:</div>
                                    <div className="font-medium">85</div>
                                </div>
                            </div>
                        </div>

                        {/* Past Events Table 
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Past Events</h4>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Attendees</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Kid Timeout with Jane</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Colchester Sup.</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">200</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Family Fun Day</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Colchester Sup.</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">430</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Storytelling Session</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">02-04-2025</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">Central Park</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">1500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )} */}
          {/* {(event.status === "Deactivated") && (
                    <>
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Reason for Reason for Disabling Account</h4>
                        <div className="flex flex-col items-center justify-center mb-6">
                            {/* Green checkmark icon in circle
                            <div className='flex flex-col-2 gap-2 items-center justify-center'>
                                <div className="bg-red-200 rounded-full p-3 mb-6">
                                    <InfoIcon className="h-5 w-5 text-red-400" />
                                </div>

                                {/* Message text (centered for both mobile and desktop) 
                                <div className=" text-left">
                                    <p className="text-bold text-gray-700">
                                        Fraudulent Ticket Sales
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Multiple complaints regarding fraudulent ticket sales associated with your events. Attendees have reported purchasing tickets that were either invalid or oversold, leading to denied entry and financial losses.
                                        If you have changed your mind click cancel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )} */}
        </div>
      </BaseModal>
      {/* <SuspendeventModal
                event={selectedevent}
                isOpen={suspendModalOpen}
                onClose={() => setSuspendModalOpen(false)}
                onConfirm={handleSuspendevent} />
             <ActivateeventModal
                event={selectedevent}
                isOpen={activateModalOpen}  // Only open when activateModalOpen is true
                onClose={() => setActivateModalOpen(false)}
                onConfirm={handleSuspendevent}
            />
           */}
      <EventCreationModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={(updatedEvent) => {
          // handle save logic here if needed
          setEditModalOpen(false);
        }}
        eventData={eventToEdit} // Pass the event to edit
      />
      <DeleteEventModal
        event={event}
        isOpen={deleteModalOpen} // Only open when activateModalOpen is true
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
};

export default EventApproveDetailsModal;

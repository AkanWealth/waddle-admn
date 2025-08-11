import React, { useState, useRef, useEffect } from "react";
import BaseModal from "../../Element/BaseModal";
import { Calendar, Clock, Upload, ChevronDown, X } from "lucide-react";
import { eventService } from "@/utils/eventService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useMessageContext } from "@/context/toast";

const EventCreationModal = ({ isOpen, onClose, onSave, eventData: initialEventData = null, isEditMode = false }) => {
 const { showMessage } = useMessageContext();
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    category: "",
    location: "",
    description: "",
    safetyMeasures: [],
    fee: "",
    capacity: "limited",
    ticketNumber: "",
    ageRange: { min: 0, max: 18 },
    frequency: "",
    images: [],
    facilities: [],
    tags: [],
    eventType: "Outdoor",
  });
  
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const timeRef = useRef(null);
  const capacityRef = useRef(null);
  const frequencyRef = useRef(null);

  // Populate form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialEventData) {
      // Map the incoming event data to the form structure
      setEventData({
        name: initialEventData.name || initialEventData.title || "",
        date: initialEventData.date || "",
        time: initialEventData.time || "",
        category: initialEventData.category || "",
        location: initialEventData.location || initialEventData.address || "",
        description: initialEventData.description || "",
        safetyMeasures: initialEventData.safetyMeasures || initialEventData.instructions || [],
        fee: initialEventData.fee || initialEventData.price || "",
        capacity: initialEventData.capacity || "limited",
        ticketNumber: initialEventData.ticketNumber || initialEventData.total_ticket || "",
        ageRange: initialEventData.ageRange || { min: 0, max: 18 },
        frequency: initialEventData.frequency || "",
        images: initialEventData.files || [],
        facilities: initialEventData.facilities || [],
        tags: initialEventData.tags || [],
        eventType: initialEventData.eventType || "Outdoor",
      });
      
      // Set individual state variables
      setCapacity(initialEventData.capacity || "limited");
      setTicketNumber(initialEventData.ticketNumber || initialEventData.total_ticket || "");
      setEventFee(initialEventData.fee || initialEventData.price || "");
      setEventType(initialEventData.eventType || "Outdoor");
    } else if (!isEditMode) {
      // Reset form when not in edit mode
      setEventData({
        name: "",
        date: "",
        time: "",
        category: "",
        location: "",
        description: "",
        safetyMeasures: [],
        fee: "",
        capacity: "limited",
        ticketNumber: "",
        ageRange: { min: 0, max: 18 },
        frequency: "",
        images: [],
        facilities: [],
        tags: [],
        eventType: "Outdoor",
      });
      setCapacity("limited");
      setTicketNumber("");
      setEventFee("");
      setEventType("Outdoor");
    }
  }, [isEditMode, initialEventData, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }

      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }

      if (
        timeRef.current &&
        !timeRef.current.contains(event.target)
      ) {
        setShowTimeDropdown(false);
      }

      if (
        capacityRef.current &&
        !capacityRef.current.contains(event.target)
      ) {
        setShowCapacityDropdown(false);
      }

      if (
        frequencyRef.current &&
        !frequencyRef.current.contains(event.target)
      ) {
        setShowFrequencyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [locationResults, setLocationResults] = useState([
    { id: 1, address: "JG64+94H, Colchester London", city: "London, UK" },
    { id: 2, address: "JG64+94H, Colchester London", city: "London, UK" },
    { id: 3, address: "Colchester London", city: "London, UK" },
  ]);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCapacityDropdown, setShowCapacityDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [currentSafetyInput, setCurrentSafetyInput] = useState("");
  const fileInputRef = useRef(null);
  const [capacity, setCapacity] = useState("limited");
  const [ticketNumber, setTicketNumber] = useState("");
  const [eventFee, setEventFee] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [eventType, setEventType] = useState('Outdoor');

  const categories = [
  { value: "indoors", label: "Indoors", emoji: "⛱️" },
  { value: "outdoors", label: "Outdoors", emoji: "🏠" },
  { value: "classes", label: "Classes", emoji: "🧍‍♂️" },
  { value: "playground", label: "Playground", emoji: "🛝" },
  { value: "food-cafe", label: "Food & Café", emoji: "🥤" },
  { value: "days-out", label: "Days Out", emoji: "🌞" },
];


  const timeSlots = [
    "08:00AM",
    "08:30AM",
    "09:00AM",
    "09:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
    "01:00PM",
    "01:30PM",
    "02:00PM",
    "02:30PM",
    "03:00PM",
    "03:30PM",
    "04:00PM",
    "04:30PM",
    "05:00PM",
    "05:30PM",
    "06:00PM",
  ];

  const capacityOptions = [
    { value: "limited", label: "Limited" },
    { value: "unlimited", label: "Unlimited" },
  ];

  const frequencyOptions = [
    { value: "", label: "Does this event repeat?" },
    { value: "one-time", label: "No, it's a one-time event" },
    { value: "weekly", label: "Weekly" },
    { value: "Every 2 weeks", label: "Every 2 weeks" },
    { value: "monthly", label: "Monthly" },
    { value: "custom", label: "Custom" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationFocus = () => {
    if (!isEditMode) {
      setShowLocationDropdown(true);
    }
  };

  const handleLocationSelect = (location) => {
    setEventData((prev) => ({ ...prev, location: location.address }));
    setShowLocationDropdown(false);
  };

  const handleCategorySelect = (category) => {
    setEventData((prev) => ({ ...prev, category: category.value }));
    setShowCategoryDropdown(false);
  };

  const handleCapacitySelect = (capacityValue) => {
    setCapacity(capacityValue);
    setEventData((prev) => ({ ...prev, capacity: capacityValue }));
    setShowCapacityDropdown(false);
  };

  const handleTimeSelect = (time) => {
    setEventData((prev) => ({ ...prev, time }));
    setShowTimeDropdown(false);
  };

  const handleFrequencySelect = (frequency) => {
    setEventData((prev) => ({ ...prev, frequency: frequency.value }));
    setShowFrequencyDropdown(false);
  };

  const handleAgeRangeChange = (values) => {
    setEventData((prev) => ({
      ...prev,
      ageRange: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  const handleFileSelect = (e) => {
    if (!isEditMode) {
      const files = Array.from(e.target.files);
      setEventData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const handleDragOver = (e) => {
    if (!isEditMode) {
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    if (!isEditMode) {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      setEventData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageFiles],
      }));
    }
  };

  const removeImage = (index) => {
    if (!isEditMode) {
      setEventData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  // const handleSafetyInputChange = (e) => {
  //   setCurrentSafetyInput(e.target.value);
  // };

  // const handleSafetyInputKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const trimmedInput = currentSafetyInput.trim();
  //     if (trimmedInput && !eventData.safetyMeasures.includes(trimmedInput)) {
  //       setEventData((prev) => ({
  //         ...prev,
  //         safetyMeasures: [...prev.safetyMeasures, trimmedInput],
  //       }));
  //       setCurrentSafetyInput("");
  //     }
  //   } 
  //   // else if (e.key === "Backspace" && currentSafetyInput === "") {
  //   //   setEventData((prev) => ({
  //   //     ...prev,
  //   //     safetyMeasures: prev.safetyMeasures.slice(0, -1),
  //   //   }));
  //   // }
  // };

  // const removeSafetyMeasure = (index) => {
  //   if (!isEditMode) {
  //     setEventData((prev) => ({
  //       ...prev,
  //       safetyMeasures: prev.safetyMeasures.filter((_, i) => i !== index),
  //     }));
  //   }
  // };


  const handleSafetyInputChange = (e) => {
  setCurrentSafetyInput(e.target.value);
};

const handleSafetyInputKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const trimmed = currentSafetyInput.trim();

    // Ignore if empty or duplicate (case-insensitive)
    if (
      trimmed &&
      !eventData.safetyMeasures.some(
        (m) => m.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setEventData((prev) => ({
        ...prev,
        safetyMeasures: [...prev.safetyMeasures, trimmed],
      }));
      setCurrentSafetyInput("");
    }
  } else if (e.key === "Backspace" && currentSafetyInput === "") {
    if (!isEditMode && eventData.safetyMeasures.length > 0) {
      setEventData((prev) => ({
        ...prev,
        safetyMeasures: prev.safetyMeasures.slice(0, -1),
      }));
    }
  }
};

const removeSafetyMeasure = (index) => {
  if (!isEditMode) {
    setEventData((prev) => ({
      ...prev,
      safetyMeasures: prev.safetyMeasures.filter((_, i) => i !== index),
    }));
  }
};

  function transformFrontendToBackend(frontendData) {
    function convertTime12to24(time12h) {
      if (!time12h) return "00:00:00";
      const [time, modifier] = time12h.split(/(AM|PM)/);
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:00`;
    }

    const ageRangeString = `${frontendData.ageRange.min}-${frontendData.ageRange.max}`;

    const price = frontendData.fee && frontendData.fee.trim() !== ""
      ? frontendData.fee
      : "0.0";

    const total_ticket =
      frontendData.ticketNumber && frontendData.ticketNumber.trim() !== ""
        ? frontendData.ticketNumber
        : frontendData.capacity && typeof frontendData.capacity === "string"
        ? frontendData.capacity === "limited"
          ? "0"
          : frontendData.capacity
        : "0";

    const instructions = frontendData.safetyMeasures && frontendData.safetyMeasures.length > 0
      ? frontendData.safetyMeasures
      : [];

    const category = frontendData.category || "";

    return {
      name: frontendData.name.trim(),
      description: frontendData.description.trim(),
      address: frontendData.location.trim(),
      price,
      total_ticket,
      date: frontendData.date || new Date().toISOString().split("T")[0],
      time: convertTime12to24(frontendData.time),
      age_range: ageRangeString,
      instructions,
      category,
      isPublished: false,
      distance: 10,
      facilities: frontendData.facilities || [],
      tags: frontendData.tags || [],
      eventType: (frontendData.eventType || "INDOOR").toUpperCase(),
      files: frontendData.images
    };
  }

  const handleNext = () => {
    setActiveTab("images");
  };

  const handleBack = () => {
    setActiveTab("details");
  };

  const handleSubmit = async () => {
    const completeEventData = {
      ...eventData,
      fee: eventFee,
      ticketNumber: ticketNumber,
      capacity: capacity,
      eventType: eventType
    };

    const backendData = transformFrontendToBackend(completeEventData);
    console.log("Sending to backend:", backendData);

    let result;
    if (isEditMode && initialEventData) {
      // Add event ID for update
      result = await eventService.updateEvent(initialEventData.id, backendData);
    } else {
      result = await eventService.createEventAsAdmin(backendData);
    }

    if (result.success) {
      showMessage("Event saved successfully", `${isEditMode ? 'Your changes have been saved successfully.' : 'Your event has been published.'}`,"success");

      onSave && onSave(eventData);
      onClose();
    } else {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, result.error);
    }
    console.log(result);
  };

  const saveAsDraft = async () => {
    const completeEventData = {
      ...eventData,
      fee: eventFee,
      ticketNumber: ticketNumber,
      capacity: capacity,
      eventType: eventType
    };
    const backendData = transformFrontendToBackend(completeEventData);
    const result = await eventService.draftEventAsAdmin(backendData);

    if (result.success) {
      showMessage("Event saved as draft", "You can edit and publish it anytime from your dashboard.","success");
      console.log("Save as draft:", eventData);
      onSave && onSave({ ...eventData, status: "draft" });
      onClose();
    } else {
      console.error("Error saving draft:", result.error);
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.value === eventData.category
  );
  const selectedCapacity = capacityOptions.find(
    (cap) => cap.value === capacity
  );
  const selectedFrequency = frequencyOptions.find(
    (freq) => freq.value === eventData.frequency
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      title={isEditMode ? "Edit Event Details" : "Create New Event"}
      className="overflow-y-auto"
      size={{ width: "99%", maxWidth: "800px" }}
      showDividers={false}
    >
      <div className="mb-4 text-sm text-gray-700">
        {isEditMode 
          ? "You are editing an event that has already been Approved. Some fields are restricted from editing"
          : "Add exciting events for families in Colchester. All events must meet our safety and compliance guidelines."
        }
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-[#2853A6] text-[#2853A6]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Event Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "images"
                ? "border-[#2853A6] text-[#2853A6]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("images")}
          >
            Event Images & Media
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="space-y-6">
          {/* Event Name & Location - Responsive Row/Column */}
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Event Name */}
            <div className="flex-1">
              <label
                htmlFor="eventName"
                className="block text-base font-semibold text-[#121212] mb-1"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="eventName"
                name="name"
                placeholder="Enter name of event"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={eventData.name}
                onChange={handleInputChange}
                disabled={isEditMode} // Restrict editing in edit mode
              />
            </div>

            {/* Location */}
            <div ref={locationRef} className="flex-1 relative">
              <label
                htmlFor="location"
                className="block text-base font-semibold text-[#121212] mb-1"
              >
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter event location"
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={eventData.location}
                  onChange={handleInputChange}
                  onFocus={handleLocationFocus}
                  disabled={isEditMode} // Restrict editing in edit mode
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* {showLocationDropdown && !isEditMode && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {locationResults.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="text-orange-500 mr-2 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div>{location.address}</div>
                        <div className="text-sm text-gray-500">
                          {location.city}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label
              htmlFor="description"
              className=" text-base font-semibold text-[#121212] mb-1"
            >
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe the event here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2853A6] focus:border-[#2853A6]"
              value={eventData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Date and Time */}
          <div ref={timeRef} className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="eventDate"
                className=" text-base font-semibold text-[#121212] mb-1"
              >
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={eventData.date}
                onChange={handleInputChange}
                disabled={isEditMode} // Restrict editing in edit mode
              />
            </div>
            <div className="relative">
              <label className="block text-base font-semibold text-[#121212] mb-1">
                Event Time <span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'} bg-white flex justify-between items-center`}
                onClick={() => !isEditMode && setShowTimeDropdown(!showTimeDropdown)}
              >
                <span
                  className={eventData.time ? "text-gray-900" : "text-gray-400"}
                >
                  {eventData.time || "00:00"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              {showTimeDropdown && !isEditMode && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                        eventData.time === time
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Event Category */}
          <div ref={categoryRef} className="relative mb-6">
            <label className="block  text-base font-semibold text-[#121212] mb-1">
              Event Category <span className="text-red-500">*</span>
            </label>
            <div
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'} bg-white flex justify-between items-center`}
              onClick={() => !isEditMode && setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span
                className={selectedCategory ? "text-gray-900" : "text-gray-400"}
              >
                {selectedCategory ? (
                  <span className="flex items-center">
                    <span className="mr-2">{selectedCategory.emoji}</span>
                    {selectedCategory.label}
                  </span>
                ) : (
                  "Select option"
                )}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            {showCategoryDropdown && !isEditMode && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.map((category) => (
                  <div
                    key={category.value}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="mr-3 text-lg">{category.emoji}</span>
                    <span>{category.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Updated Tickets and Fee Section */}
          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tickets Available */}
              <div>
                <label className="block  text-base font-semibold text-[#121212] mb-1">
                  Tickets Available
                </label>
                <div className="flex">
                  <div ref={capacityRef} className="relative min-w-22">
                    <div
                      className={`flex items-center justify-between px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md ${!isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      onClick={() => !isEditMode && setShowCapacityDropdown(!showCapacityDropdown)}
                    >
                      <span className="text-gray-700">
                        {capacity === "limited" ? "Limited" : "Unlimited"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                    {showCapacityDropdown && !isEditMode && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div
                          className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleCapacitySelect("limited")}
                        >
                          Limited
                        </div>
                        <div
                          className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleCapacitySelect("unlimited")}
                        >
                          Unlimited
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ticket number"
                    className="flex-1 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    disabled={capacity !== "limited" || isEditMode}
                  />
                </div>
              </div>
              {/* Event Fee */}
              <div>
                <label
                  htmlFor="fee"
                  className="block t text-base font-semibold text-[#121212] mb-1"
                >
                  Event Fee (£)
                </label>
                <input
                  type="text"
                  id="fee"
                  placeholder="Leave blank if free"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={eventFee}
                  onChange={(e) => setEventFee(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div ref={frequencyRef} className="relative">
              <label className="block  text-base font-semibold text-[#121212] mb-1">
                Event Frequency <span className="text-gray-400">(Optional)</span>
              </label>
              <div
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditMode ? 'cursor-pointer' : 'cursor-not-allowed'} bg-white flex justify-between items-center`}
                onClick={() => !isEditMode && setShowFrequencyDropdown(!showFrequencyDropdown)}
              >
                <span
                  className={
                    selectedFrequency?.value ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {selectedFrequency?.label || "Does this event repeat?"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              {showFrequencyDropdown && !isEditMode && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {frequencyOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                        eventData.frequency === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900"
                      }`}
                      onClick={() => handleFrequencySelect(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block  text-base font-semibold text-[#121212] mb-1">
                Age Range
              </label>
              <div className="flex justify-between mb-3">
                <span className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-800 font-medium">
                  {eventData.ageRange.min} Years
                </span>
                <span className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-800 font-medium">
                  {eventData.ageRange.max} Years
                </span>
              </div>
              <div className="px-3 py-4">
                <Slider
                  range
                  min={0}
                  max={18}
                  value={[eventData.ageRange.min, eventData.ageRange.max]}
                  onChange={handleAgeRangeChange}
                  trackStyle={[{ backgroundColor: '#22c55e' }]}
                  handleStyle={[
                    { 
                      borderColor: '#22c55e',
                      backgroundColor: 'white',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    },
                    { 
                      borderColor: '#22c55e',
                      backgroundColor: 'white',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }
                  ]}
                  railStyle={{ backgroundColor: '#e5e7eb' }}
                  disabled={isEditMode}
                />
              </div>
            </div>
          </div>

          {/* Safety Measures */}
          <div>
            <label className="block  text-base font-semibold text-[#121212] mb-1">
              Safety Measures
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 min-h-10 flex flex-wrap items-center gap-2">
              {eventData.safetyMeasures.map((measure, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  <span>{measure}</span>
                  {!isEditMode && (
                    <button
                      type="button"
                      onClick={() => removeSafetyMeasure(index)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              <input
                type="text"
                placeholder={
                  eventData.safetyMeasures.length === 0
                    ? "Enter applicable event measures"
                    : ""
                }
                className="flex-1 min-w-32 outline-none bg-transparent text-sm"
                value={currentSafetyInput}
                onChange={handleSafetyInputChange}
                onKeyDown={handleSafetyInputKeyDown}
                disabled={isEditMode}
              />
            </div>
            <p className="text-sm text-gray-800 mt-2">
              Press <span className="font-semibold">Enter</span> to add safety measures
            </p>
          </div>

        </div>
      )}

      {activeTab === "images" && (
        <div className="space-y-6">
          {/* Additional Media Content Section */}
          <FacilitiesDropdown
            facilities={eventData.facilities}
            onChange={(newFacilities) =>
              setEventData({ ...eventData, facilities: newFacilities })
            }
            disabled={isEditMode}
          />

          <div>
            <label className=" text-base flex items-center font-semibold text-[#303237] mb-1">
              <span className="">
                Event Type 
              </span>
              <span className="text-[#CB1A14]">*</span>
            </label>
            <div className="flex items-center gap-6 mt-2">
              {['Indoor', 'Outdoor'].map((type) => (
                <label key={type} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="eventType"
                    value={type}
                    checked={eventType === type}
                    onChange={() => setEventType(type)}
                    className="form-radio text-blue-600"
                    disabled={isEditMode}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <TagsDropdown
            tags={eventData.tags}
            onChange={(newTags) =>
              setEventData({ ...eventData, tags: newTags })
            }
            disabled={isEditMode}
          />

          {/* Upload Photo/Flyer */}
          <div>
            <label className="block text-base font-semibold text-[#272727] mb-1">
              Upload Event Photo/Flyer
            </label>
            <div
              className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center relative min-h-32 ${isEditMode ? 'bg-gray-50' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {eventData?.images?.length === 0 ? (
                <div>
                  <div className="flex justify-center mb-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {isEditMode ? "Images cannot be changed in edit mode" : "Drag and drop your cover image"}
                  </p>
                  {!isEditMode && (
                    <>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPEG</p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-[#2853A6] text-white rounded-md text-sm font-medium hover:bg-blue-700"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {console.log(eventData, "This is the event in edit event")}
                    {eventData?.images?.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        {!isEditMode && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {!isEditMode && (
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#2853A6] text-white rounded-md text-sm font-medium hover:bg-blue-500"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Add More Images
                    </button>
                  )}
                </div>
              )}

              {!isEditMode && (
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex mt-8 space-x-4">
        {activeTab === "details" ? (
          <div className="flex items-center justify-between w-full mt-8 flex-wrap gap-4">
            <button
              onClick={onClose}
              className="py-3 px-4 text-[#2853A6] font-semibold hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>

            <div className="flex gap-4 flex-wrap">
              {!isEditMode && (
                <button
                  onClick={saveAsDraft}
                  className="py-3 px-4 border border-[#2853A6] font-semibold text-[#2853A6] hover:bg-blue-50 rounded-md transition-colors"
                >
                  Save as Draft
                </button>
              )}
              <button
                onClick={handleNext}
                className="py-3 px-4 bg-[#2853A6] hover:bg-blue-600 font-semibold text-white rounded-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full mt-8 flex-wrap gap-4">
            <button
              onClick={handleBack}
              className="py-3 px-4 text-[#2853A6] font-semibold hover:bg-gray-100 rounded-md transition-colors"
            >
              Back
            </button>

            <div className="flex gap-4 flex-wrap">
              {!isEditMode && (
                <button
                  onClick={saveAsDraft}
                  className="py-3 px-4 border border-[#2853A6] text-[#2853A6] font-semibold hover:bg-blue-50 rounded-md transition-colors"
                >
                  Save as Draft
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="py-3 px-4 bg-[#2853A6] text-white font-semibold hover:bg-blue-600 rounded-md transition-colors"
              >
                {isEditMode ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default EventCreationModal;

const TagsDropdown = ({ tags = [], onChange, placeholder = "Select tags", disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Available tag options
  const availableTags = [
    "Waddle Approved",
    "Creative",
    "Musical",
    "Adventurous",
    "Baby-friendly",
    "Drop-in",
    "Book Ahead",
    "Rainy Day Winner",
    "Buggy-accessible",
    "Dog-friendly"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTag = (tag) => {
    if (disabled) return;
    if (tags.includes(tag)) {
      onChange(tags.filter(t => t !== tag));
    } else {
      onChange([...tags, tag]);
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const removeTag = (tagToRemove) => {
    if (!disabled) {
      onChange(tags.filter(tag => tag !== tagToRemove));
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="text-base flex items-center font-semibold text-[#303237] mb-1">
        <span>Tag</span>
        <span className="text-[#CB1A14]">*</span>
      </label>
      
      {/* Selected tags display */}
      <div className={`border border-gray-300 rounded-md px-3 py-2 min-h-10 flex flex-wrap items-center gap-2 ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-50'}`}
           onClick={handleDropdownClick}>
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-[#EAEEF6] text-[#303237] px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="ml-1 text-[#303237]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        
        {tags.length === 0 && (
          <span className="text-gray-500 text-sm">{placeholder}</span>
        )}
        
        <div className="ml-auto">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {availableTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer select-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTag(tag);
              }}
            >
              {/* Blue squared checkbox */}
              <div className={`w-4 h-4 border-[.83px] border-[#DBDBD8] rounded-sm mr-3 flex items-center justify-center ${
                tags.includes(tag) ? 'bg-blue-500' : 'bg-white'
              }`}>
                {tags.includes(tag) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#303237]">{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FacilitiesDropdown = ({ facilities = [], onChange, placeholder = "Select facilities", disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const availableFacilities = [
    "Toilets",
    "Parking",
    "Cafe",
    "Changing Room"
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFacility = (facility) => {
    if (disabled) return;
    if (facilities.includes(facility)) {
      onChange(facilities.filter(f => f !== facility));
    } else {
      onChange([...facilities, facility]);
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const removeFacility = (facilityToRemove) => {
    if (!disabled) {
      onChange(facilities.filter(facility => facility !== facilityToRemove));
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="text-base flex items-center font-semibold text-[#303237] mb-1">
        <span>Facilities</span>
        <span className="text-[#CB1A14]">*</span>
      </label>

      {/* Selected facilities display */}
      <div
        className={`border border-gray-300 rounded-md px-3 py-2 min-h-10 flex flex-wrap items-center gap-2 ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-50'}`}
        onClick={handleDropdownClick}
      >
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="flex items-center bg-[#EAEEF6] text-[#303237] px-2 py-1 rounded-full text-sm"
          >
            <span>{facility}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFacility(facility);
                }}
                className="ml-1 text-[#303237]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {facilities.length === 0 && (
          <span className="text-gray-500 text-sm">{placeholder}</span>
        )}

        <div className="ml-auto">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Dropdown list */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {availableFacilities.map((facility) => (
            <div
              key={facility}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer select-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFacility(facility);
              }}
            >
              <div className={`w-4 h-4 border-[.83px] border-[#DBDBD8] rounded-sm mr-3 flex items-center justify-center ${
                facilities.includes(facility) ? "bg-blue-500" : "bg-white"
              }`}>
                {facilities.includes(facility) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">{facility}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
import React, { useState, useRef } from "react";
import BaseModal from "../../Element/BaseModal";
import { Calendar, Clock, Upload, ChevronDown, X } from "lucide-react";
import { eventService } from "@/utils/eventService";

const EventCreationModal = ({ isOpen, onClose, onSave }) => {
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
  });

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

  const categories = [
    { value: "camping", label: "Camping", emoji: "🏕️" },
    { value: "games", label: "Games", emoji: "🎮" },
    { value: "arts", label: "Arts", emoji: "🎨" },
    { value: "cooking", label: "Cooking", emoji: "👨‍🍳" },
    { value: "dance", label: "Dance", emoji: "💃" },
    { value: "concerts", label: "Concerts", emoji: "🎤" },
    { value: "sports", label: "Sports", emoji: "⚽" },
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
    { value: "one-time", label: "No, it’s a one-time event" },
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
    setShowLocationDropdown(true);
  };

  const handleLocationSelect = (location) => {
    setEventData((prev) => ({ ...prev, location: location.address }));
    setShowLocationDropdown(false);
  };

  const handleCategorySelect = (category) => {
    setEventData((prev) => ({ ...prev, category: category.value }));
    setShowCategoryDropdown(false);
  };

  const handleCapacitySelect = (capacity) => {
    setEventData((prev) => ({ ...prev, capacity: capacity.value }));
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

  const handleAgeRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    setEventData((prev) => {
      const newRange = { ...prev.ageRange };
      if (type === "min") {
        newRange.min = Math.min(value, prev.ageRange.max);
      } else {
        newRange.max = Math.max(value, prev.ageRange.min);
      }
      return { ...prev, ageRange: newRange };
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setEventData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setEventData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageFiles],
    }));
  };

  const removeImage = (index) => {
    setEventData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSafetyInputChange = (e) => {
    setCurrentSafetyInput(e.target.value);
  };

  const handleSafetyInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const trimmedInput = currentSafetyInput.trim();
      if (trimmedInput && !eventData.safetyMeasures.includes(trimmedInput)) {
        setEventData((prev) => ({
          ...prev,
          safetyMeasures: [...prev.safetyMeasures, trimmedInput],
        }));
        setCurrentSafetyInput("");
      }
    } else if (e.key === "Backspace" && currentSafetyInput === "") {
      // Remove the last tag when backspace is pressed on empty input
      setEventData((prev) => ({
        ...prev,
        safetyMeasures: prev.safetyMeasures.slice(0, -1),
      }));
    }
  };

  const removeSafetyMeasure = (index) => {
    setEventData((prev) => ({
      ...prev,
      safetyMeasures: prev.safetyMeasures.filter((_, i) => i !== index),
    }));
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

    // Fix price handling - use the actual fee value
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

    // Convert safetyMeasures array to instructions array
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
      date: frontendData.date,
      time: convertTime12to24(frontendData.time),
      age_range: ageRangeString,
      instructions,
      category,
      isPublished: false,
      distance: 10, // Default distance
      facilities: [], // Default empty facilities array
      tags: [], // Default empty tags array
      eventType: "INDOOR" // Default event type
    };
  }

  const handleSubmit = async () => {
    // Merge the separate state variables with eventData
    const completeEventData = {
      ...eventData,
      fee: eventFee,
      ticketNumber: ticketNumber,
      capacity: capacity
    };

    const backendData = transformFrontendToBackend(completeEventData);
    console.log("Sending to backend:", backendData);

    // Send JSON data instead of FormData
    const result = await eventService.createEventAsAdmin(backendData);

    if (result.success) {
      onSave && onSave(eventData);
      onClose();
    } else {
      console.error("Error creating event:", result.error);
    }
    console.log(result);
  };

  // const handleSubmit = () => {
  //     console.log('Submit event:', eventData);
  //     onSave && onSave(eventData);
  //     onClose();
  // };

  const saveAsDraft = () => {
    console.log("Save as draft:", eventData);
    onSave && onSave({ ...eventData, status: "draft" });
    onClose();
  };

  const selectedCategory = categories.find(
    (cat) => cat.value === eventData.category
  );
  const selectedCapacity = capacityOptions.find(
    (cap) => cap.value === eventData.capacity
  );
  const selectedFrequency = frequencyOptions.find(
    (freq) => freq.value === eventData.frequency
  );
  const [eventType, setEventType] = useState("details");

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      // width="480px"
      title="Create New Event"
      className="overflow-y-auto"
      size={{ width: "99%", maxWidth: "800px" }}
      //   className="m-0 rounded-none max-h-full h-full"
      showDividers={false}
    >
      <div className="mb-4 text-sm text-gray-700">
        Add exciting events for families in Colchester. All events must meet our
        safety and compliance guidelines.
      </div>


{
  eventType === "details" && (
     <div className="space-y-6">
        {/* Event Name & Location - Responsive Row/Column */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Event Name */}
          <div className="flex-1">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700 mb-1"
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
            />
          </div>

          {/* Location */}
          <div className="flex-1 relative">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
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

            {showLocationDropdown && (
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
            )}
          </div>
        </div>

        {/* Event Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700 mb-1"
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
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Time <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center"
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            >
              <span
                className={eventData.time ? "text-gray-900" : "text-gray-400"}
              >
                {eventData.time || "00:00"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            {showTimeDropdown && (
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
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Category <span className="text-red-500">*</span>
          </label>
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
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
          {showCategoryDropdown && (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tickets Available
              </label>
              <div className="flex">
                <div className="relative min-w-22">
                  <div
                    className="flex items-center justify-between px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md cursor-pointer"
                    onClick={() =>
                      setShowCapacityDropdown(!showCapacityDropdown)
                    }
                  >
                    <span className="text-gray-700">
                      {capacity === "limited" ? "Limited" : "Unlimited"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  {showCapacityDropdown && (
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
                  disabled={capacity !== "limited"}
                />
              </div>
            </div>
            {/* Event Fee */}
            <div>
              <label
                htmlFor="fee"
                className="block text-sm font-medium text-gray-700 mb-1"
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
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Frequency <span className="text-gray-400">(Optional)</span>
            </label>
            <div
              className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center"
              onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
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
            {showFrequencyDropdown && (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <div className="relative px-3">
              <div className="relative h-2">
                {/* Track background */}
                <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                {/* Active track */}
                <div
                  className="absolute h-2 bg-green-500 rounded-full"
                  style={{
                    left: `${(eventData.ageRange.min / 18) * 100}%`,
                    width: `${
                      ((eventData.ageRange.max - eventData.ageRange.min) / 18) *
                      100
                    }%`,
                  }}
                ></div>
                {/* Min thumb */}
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    left: `calc(${(eventData.ageRange.min / 18) * 100}% - 8px)`,
                    top: "-4px",
                  }}
                ></div>
                {/* Max thumb */}
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    left: `calc(${(eventData.ageRange.max / 18) * 100}% - 8px)`,
                    top: "-4px",
                    zIndex:
                      eventData.ageRange.max === eventData.ageRange.min
                        ? 20
                        : 2, // bring to front if overlapping
                  }}
                ></div>
                {/* Min thumb */}
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    left: `calc(${(eventData.ageRange.min / 18) * 100}% - 8px)`,
                    top: "-4px",
                    zIndex:
                      eventData.ageRange.max === eventData.ageRange.min
                        ? 18
                        : 2, // bring to front if overlapping
                  }}
                ></div>
                {/* Min range input */}
                <input
                  type="range"
                  min="0"
                  max="18"
                  value={eventData.ageRange.min}
                  onChange={(e) => handleAgeRangeChange(e, "min")}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                  style={{ zIndex: 3 }}
                />
                {/* Max range input */}
                <input
                  type="range"
                  min="0"
                  max="18"
                  value={eventData.ageRange.max}
                  onChange={(e) => handleAgeRangeChange(e, "max")}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                  style={{ zIndex: 3 }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Safety Measures */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Safety Measures
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-10 flex flex-wrap items-center gap-2">
            {eventData.safetyMeasures.map((measure, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                <span>{measure}</span>
                <button
                  type="button"
                  onClick={() => removeSafetyMeasure(index)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
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
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Press Enter or Space to add a measure
          </p>
        </div>

        {/* Upload Photo/Flyer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Event Photo/Flyer
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center relative min-h-32"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {eventData.images.length === 0 ? (
              <div>
                <div className="flex justify-center mb-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop your cover image
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPEG</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-[#2853A6] text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {eventData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#2853A6] text-white rounded-md text-sm font-medium hover:bg-blue-500"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add More Images
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>
  )
  }

      {/* Footer Buttons */}
      <div className="flex mt-8 space-x-4">
        <button
          onClick={onClose}
          className="flex-1 py-3 text-[#2853A6] hover:bg-gray-100 rounded-md text-center transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={saveAsDraft}
          className="flex-1 py-3 border border-[#2853A6] text-blue-500 hover:bg-blue-50 rounded-md text-center transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-[#2853A6] hover:bg-blue-600 text-white rounded-md text-center transition-colors"
        >
          Create Event
        </button>
      </div>
    </BaseModal>
  );
};

export default EventCreationModal;

// // First, add the uploadService import at the top of your component
// import { uploadService } from "@/utils/uploadService"; // Adjust path as needed

// // Then replace your handleSubmit function with this updated version:
// const handleSubmit = async () => {
//   const completeEventData = {
//     ...eventData,
//     fee: eventFee,
//     ticketNumber: ticketNumber,
//     capacity: capacity,
//     eventType: eventType
//   };

//   let uploadedImageUrls = [];
  
//   // Upload images if there are any new File objects (not in edit mode)
//   if (!isEditMode && completeEventData.images && completeEventData.images.length > 0) {
//     // Filter out any existing URLs and only upload new File objects
//     const filesToUpload = completeEventData.images.filter(file => file instanceof File);
    
//     if (filesToUpload.length > 0) {
//       showMessage("Uploading images...", "Please wait while we upload your images.", "info");
      
//       const uploadResult = await uploadService.uploadImages("events", filesToUpload);
      
//       if (!uploadResult.success) {
//         showMessage("Upload failed", "Failed to upload images. Please try again.", "error");
//         return;
//       }
      
//       uploadedImageUrls = uploadResult.data || [];
//     }
    
//     // Combine existing URLs (if any) with newly uploaded URLs
//     const existingUrls = completeEventData.images.filter(file => typeof file === 'string');
//     completeEventData.images = [...existingUrls, ...uploadedImageUrls];
//   }

//   const backendData = transformFrontendToBackend(completeEventData);
//   console.log("Sending to backend:", backendData);

//   let result;
//   if (isEditMode && initialEventData) {
//     // Add event ID for update
//     result = await eventService.updateEvent(initialEventData.id, backendData);
//   } else {
//     result = await eventService.createEventAsAdmin(backendData);
//   }

//   if (result.success) {
//     showMessage("Event saved successfully", `${isEditMode ? 'Your changes have been saved successfully.' : 'Your event has been published.'}`, "success");

//     onSave && onSave(eventData);
//     onClose();
//   } else {
//     console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, result.error);
//     showMessage("Save failed", `Failed to ${isEditMode ? 'update' : 'create'} event. Please try again.`, "error");
//   }
// };

// // Also update the saveAsDraft function:
// const saveAsDraft = async () => {
//   const completeEventData = {
//     ...eventData,
//     fee: eventFee,
//     ticketNumber: ticketNumber,
//     capacity: capacity,
//     eventType: eventType
//   };

//   let uploadedImageUrls = [];
  
//   // Upload images if there are any new File objects
//   if (completeEventData.images && completeEventData.images.length > 0) {
//     const filesToUpload = completeEventData.images.filter(file => file instanceof File);
    
//     if (filesToUpload.length > 0) {
//       showMessage("Uploading images...", "Please wait while we upload your images.", "info");
      
//       const uploadResult = await uploadService.uploadImages("events", filesToUpload);
      
//       if (!uploadResult.success) {
//         showMessage("Upload failed", "Failed to upload images. Please try again.", "error");
//         return;
//       }
      
//       uploadedImageUrls = uploadResult.data || [];
//     }
    
//     // Combine existing URLs (if any) with newly uploaded URLs
//     const existingUrls = completeEventData.images.filter(file => typeof file === 'string');
//     completeEventData.images = [...existingUrls, ...uploadedImageUrls];
//   }

//   const backendData = transformFrontendToBackend(completeEventData);
//   const result = await eventService.draftEventAsAdmin(backendData);

//   if (result.success) {
//     showMessage("Event saved as draft", "You can edit and publish it anytime from your dashboard.", "success");
//     console.log("Save as draft:", eventData);
//     onSave && onSave({ ...eventData, status: "draft" });
//     onClose();
//   } else {
//     console.error("Error saving draft:", result.error);
//     showMessage("Draft save failed", "Failed to save draft. Please try again.", "error");
//   }
// };
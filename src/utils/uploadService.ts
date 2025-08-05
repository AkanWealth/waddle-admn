import { baseUrl } from "@/lib/envfile";

const API_BASE_URL = `${baseUrl}/api/v1`; // Replace this with your actual backend URL

// ----------------------
// Response Type Definitions
// ----------------------

export interface UploadImagesResponse {
  success: boolean;
  data?: string[]; // URLs of uploaded images
  message?: string;
}

export interface DeleteSingleImageResponse {
  success: boolean;
  message?: string;
}

export interface DeleteMultipleImagesResponse {
  success: boolean;
  deleted?: string[]; // filenames that were deleted
  message?: string;
}

// ----------------------
// Upload Service Methods
// ----------------------

export const uploadService = {
  /**
   * Upload multiple images to a specific folder
   */
  async uploadImages(
    folder: string,
    files: File[]
  ): Promise<UploadImagesResponse> {
    if (!folder || !files?.length) {
      return { success: false, message: "Folder and files are required" };
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(
        `${API_BASE_URL}/uploads?folder=${encodeURIComponent(folder)}`,
        {
          method: "POST",
          body: formData,
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Upload failed:", error);
      return { success: false, message: "Upload failed" };
    }
  },

  /**
   * Delete a single image from a folder
   */
  async deleteSingleImage(
    folder: string,
    fileName: string
  ): Promise<DeleteSingleImageResponse> {
    if (!folder || !fileName) {
      return { success: false, message: "folder and fileName are required" };
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/uploads/one?folder=${encodeURIComponent(
          folder
        )}&fileName=${encodeURIComponent(fileName)}`,
        {
          method: "DELETE",
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Delete failed:", error);
      return { success: false, message: "Delete failed" };
    }
  },

  /**
   * Delete multiple images from a folder
   */
  async deleteMultipleImages(
    folder: string,
    fileNames: string[]
  ): Promise<DeleteMultipleImagesResponse> {
    if (!folder || !Array.isArray(fileNames)) {
      return { success: false, message: "folder and fileNames[] required" };
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/uploads/many?folder=${encodeURIComponent(folder)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileNames }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Bulk delete failed:", error);
      return { success: false, message: "Bulk delete failed" };
    }
  },
};

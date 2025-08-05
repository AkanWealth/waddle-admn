/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Loader2,  UserRoundPen } from "lucide-react";
import clsx from "clsx";

export default function UserImageUpload({ imageUrl, onUpload }: any) {
  const [preview, setPreview] = useState(imageUrl || null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);

        // Call upload handler (e.g., upload to server or storage)
        await onUpload(file);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div className="mb-6">
      <div
        {...getRootProps()}
        className={clsx(
          "relative w-24 h-24 rounded-full cursor-pointer flex items-center justify-center overflow-hidden transition-colors",
          {
            "": isDragActive,
            " bg-[#F7F7F7]": !isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        ) : preview ? (
          <Image
            src={preview}
            alt="User profile"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <UserRoundPen className="w-6 h-6 text-[#1A1717]" />
        )}
      </div>
    </div>
  );
}

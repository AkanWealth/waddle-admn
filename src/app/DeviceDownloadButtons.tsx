"use client";
import SVGAssets from "@/assets/assets/svg";
import { useDeviceType } from "@/hooks/useDeviceType";
import Image from "next/image";
import React from "react";

const DeviceDownloadButtons = () => {
  const { deviceType } = useDeviceType();

  return (
    <>
      {deviceType == "ios" ? (
        <button className="h-[60px] w-[200px]" type="button">
          <Image
            src={SVGAssets.DownloadViaApple}
            alt="Download via Apple"
            height={60}
            width={200}
            className="h-[60px] w-[200px] object-contain"
          />
        </button>
      ) : (
        <button className="h-[60px] w-[200px]" type="button">
          <Image
            src={SVGAssets.DownloadViaGoogle}
            alt="Download via Google"
            height={60}
            width={200}
            className="h-[60px] w-[200px] object-contain"
          />
        </button>
      )}
    </>
  );
};

export default DeviceDownloadButtons;

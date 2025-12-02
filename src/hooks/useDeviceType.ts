"use client";
import { useEffect, useState } from "react";

type DeviceType = "ios" | "android";

interface UseDeviceTypeReturn {
  deviceType: DeviceType;
  isIOS: boolean;
  isAndroid: boolean;
  appStoreLink: string;
  googlePlayStoreLink: string;
  appleAppStoreLink: string;
}

export function useDeviceType(): UseDeviceTypeReturn {
  const [deviceType, setDeviceType] = useState<DeviceType>("android");

  useEffect(() => {
    const userAgent =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const platform = navigator.platform || "";

    // Check for any Apple device (iOS devices, Mac, etc.)
    const isAppleDevice =
      /iPad|iPhone|iPod/.test(userAgent) || // iOS devices
      /Macintosh|MacIntel|MacPPC|Mac68K/.test(platform) || // Mac computers
      (platform === "MacIntel" && navigator.maxTouchPoints > 1) || // iPad Pro on Safari
      /Mac OS X/.test(userAgent); // Additional Mac check

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isAppleDevice && !(window as any).MSStream) {
      setDeviceType("ios");
    } else {
      // Default to Android for all non-Apple devices
      setDeviceType("android");
    }
  }, []);

  const googlePlayStoreLink =
    "https://play.google.com/store/apps/details?id=your.app.id";
  const appleAppStoreLink = "https://apps.apple.com/your-app-link";

  const appStoreLink =
    deviceType === "ios"
      ? appleAppStoreLink // Replace with your actual App Store link
      : googlePlayStoreLink; // Replace with your actual Play Store link

  return {
    deviceType,
    isIOS: deviceType === "ios",
    isAndroid: deviceType === "android",
    appStoreLink,
    googlePlayStoreLink,
    appleAppStoreLink,
  };
}

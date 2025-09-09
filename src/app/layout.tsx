import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContext } from "@/context/toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waddle - Your Local Parenting Companion",
  description:
    "Waddle is your local parenting companion. We help you discover nearby kid-friendly things to do—like parks, cafés, activities, and events—without the endless scroll.",
  icons: {
    icon: "/HomeLogo.svg",
    shortcut: "/HomeLogo.svg",
    apple: "/HomeLogo.svg",
  },
  metadataBase: new URL("https://www.waddleapp.io"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: "Waddle - Your Local Parenting Companion",
    description:
      "Discover nearby kid-friendly places and activities. Parks, cafés, events, and more—all without the endless scroll.",
    url: "https://www.waddleapp.io",
    siteName: "Waddle",
    images: [
      {
        url: "https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png",
        width: 1200,
        height: 630,
        alt: "Waddle - Your Local Parenting Companion",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waddle - Your Local Parenting Companion",
    description:
      "Discover nearby kid-friendly places and activities. Parks, cafés, events, and more—all without the endless scroll.",
    images: [
      {
        url: "https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png",
        alt: "Waddle - Your Local Parenting Companion",
      },
    ],
    site: "@waddleapp",
    creator: "@waddleapp",
  },
  // Additional meta tags that can help with social sharing
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000", // Add your brand color here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Additional meta tags for better social sharing */}
        <meta
          property="og:image:secure_url"
          content="https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png"
        />
        <meta
          name="twitter:image:src"
          content="https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png"
        />
      </head>
      <body className="antialiased font-sans">
        <AuthProvider>
          <ToastContext>{children}</ToastContext>
        </AuthProvider>
      </body>
    </html>
  );
}

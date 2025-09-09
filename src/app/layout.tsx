import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Import Inter
import { ToastContext } from "@/context/toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

// ✅ Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waddle",
  description:
    "Waddle is your local parenting companion. We help you discover nearby kid-friendly things to do—like parks, cafés, activities, and events—without the endless scroll.",
  icons: {
    icon: "/HomeLogo.svg",
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
    title: "Waddle",
    description:
      "Waddle is your local parenting companion. We help you discover nearby kid-friendly things to do—like parks, cafés, activities, and events—without the endless scroll.",
    url: "https://www.waddleapp.io/",
    siteName: "Waddle",
    images: [
      {
        url: "https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png",
        secureUrl:
          "https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png",
        width: 1200,
        height: 630,
        alt: "Waddle",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waddle",
    description:
      "Waddle is your local parenting companion. We help you discover nearby kid-friendly things to do—like parks, cafés, activities, and events—without the endless scroll.",
    images: [
      "https://res.cloudinary.com/dfdlbxdqi/image/upload/v1757410027/Screenshot_2025-09-09_at_10.20.35_AM_gcljmg.png",
    ],
    site: "@waddleapp",
    creator: "@waddleapp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <ToastContext>{children}</ToastContext>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Import Inter
import { ToastContext } from "@/context/toast";
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";

// ✅ Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waddle Admin Dashboard",
  description: "",
  icons: {
    icon: "/HomeLogo.svg",
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
          <ToastContext>
            {children}
          </ToastContext>
        </AuthProvider>
      </body>
    </html>
  );
}

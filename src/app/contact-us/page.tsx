import React from "react";
import ContactUsPage from "./ContactUsClient";
export const metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const ContactUs = () => {
  return <ContactUsPage />;
};

export default ContactUs;

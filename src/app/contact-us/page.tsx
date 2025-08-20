"use client";
import React, { useState } from "react";
import Header from "../component/component/Headers/Headers";
import Footer from "../component/component/Homepage/Footer";
import Image from "next/image";
import ImageFiles from "@/assets/assets/images";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ContactUsModal from "../component/ModalPages/ContactUs/ContactUsModal";

const ContactUsPage = () => {
  const [isOpenContactUsModal, setIsOpenContactUsModal] = useState(false);
  const handleContactUs = () => {
    setIsOpenContactUsModal(true);
  };

  return (
    <section className="bg-white min-h-screen">
      <header className="sticky top-0 z-50">
        <Header usedFor="started" />
      </header>

      <section className="flex flex-col">
        <div className="relative w-full h-[550px]">
          {/* Background image */}
          <Image
            src={ImageFiles.ContactUsImage}
            alt="Contact Us"
            fill
            className="object-cover top-0 bottom-0 left-0 right-0"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Centered text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">Contact Us</h1>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-[80px] py-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#303237] text-4xl font-bold">GET IN TOUCH</h1>
            <p className="text-[#898483] text-[16px]">
              Feel free to reach out to us with any questions, feedback or
              inquiries. We are here to assist you every step of the way.
            </p>
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#303237] text-[16px] font-bold">
                <span className="text-[#121212] text-[16px]">Name</span>
                <span className="text-[#FF0000] text-[16px]">*</span>
              </h2>
              <input
                type="text"
                className="w-full px-4 py-3 border !text-[#000000] border-[#BDC0CE] outline-none rounded-md"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[#303237] text-[16px] font-bold">
                <span className="text-[#121212] text-[16px]">Email</span>
                <span className="text-[#FF0000] text-[16px]">*</span>
              </h2>
              <input
                type="text"
                className="w-full px-4 py-3 border !text-[#000000] border-[#BDC0CE] outline-none rounded-md"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[#303237] text-[16px] font-bold">
                <span className="text-[#121212] text-[16px]">
                  How can we help?{" "}
                </span>
                <span className="text-[#FF0000] text-[16px]">*</span>
              </h2>
              <textarea
                className="w-full px-4 py-3 border min-h-[100px] resize-none !text-[#000000] border-[#BDC0CE] outline-none rounded-md"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-between gap-2">
              <p className="text-[#898483]  text-[16px]">
                <span className="">
                  By sending this form, I confirm I have read and accepted the
                </span>

                <Link
                  href="/privacy-policy"
                  className="text-[#2853A6] pl-1.5 text-[16px]"
                >
                  Privacy Policy
                </Link>
                <span className="text-[#898483] text-[16px] ">, and</span>
                <Link
                  href="/terms-of-use"
                  className="text-[#2853A6] pl-1.5 text-[16px]"
                >
                  Terms & Conditions
                </Link>
              </p>
              <button
                onClick={handleContactUs}
                className="bg-[#2853A6]  flex items-center gap-2 text-white px-8 py-3 rounded-[12px]"
              >
                <span className="text-[#FFFFFF] font-medium text-nowrap text-[16px]">
                  Send message
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAEEF6] py-[70px] px-4 sm:px-6 lg:px-[80px]">
        <Footer />
      </section>
      {isOpenContactUsModal && (
        <ContactUsModal setIsOpenContactUsModal={setIsOpenContactUsModal} />
      )}
    </section>
  );
};

export default ContactUsPage;

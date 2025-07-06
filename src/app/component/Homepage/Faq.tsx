"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import SVGAssets from "@/assets/svg";

// Type definitions
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

interface FAQProps {
  faqs: FAQ[];
}

// Individual FAQ Item Component
const FAQItem: React.FC<{ faq: FAQ; onToggle: (id: string) => void }> = ({
  faq,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => onToggle(faq.id)}
        className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={faq.isExpanded}
      >
        <h3 className="text-lg font-semibold text-[#303237] pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0">
          {faq.isExpanded ? (
            <Minus className="w-5 h-5 text-gray-500 cursor-pointer" />
          ) : (
            <Plus className="w-5 h-5 text-gray-500 cursor-pointer" />
          )}
        </div>
      </button>

      {faq.isExpanded && (
        <div className="px-6 pb-4">
          <div className="text-[#565C69] text-base font-normal leading-relaxed">
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  );
};

// Main FAQ Component
export const FAQSection: React.FC<FAQProps> = ({ faqs }) => {
  const [faqList, setFaqList] = useState<FAQ[]>(faqs);

  const toggleFAQ = (id: string) => {
    setFaqList((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
      )
    );
  };

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Left Side - Title and Illustration */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h3 className="text-[#303237] text-[32px] sm:text-[40px] lg:text-[48px] font-semibold">
            FAQs
          </h3>
          <p className="text-[#565C69] text-base font-normal">
            Some of the most commonly asked questions
          </p>
          <div>
            <Image
              src={SVGAssets.FaqSignature}
              alt="Signature"
              className="h-[93px] w-[286px] object-contain"
            />
          </div>
        </div>

        {/* Right Side - FAQ List */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
            {faqList.map((faq) => (
              <FAQItem key={faq.id} faq={faq} onToggle={toggleFAQ} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

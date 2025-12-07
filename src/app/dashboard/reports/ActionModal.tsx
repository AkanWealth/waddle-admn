/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BsCheckCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";

type ActionModalProps = {
  open: boolean;
  onClose: () => void;
  onMarkReviewed: () => void;
  onRemoveContent?: () => void;
  showRemove: boolean;
  anchor: { top: number; left: number } | null;
};

export default function ActionModal({
  open,
  onClose,
  onMarkReviewed,
  onRemoveContent,
  showRemove,
  anchor,
}: ActionModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside or Escape key
  useEffect(() => {
    // Avoid attaching listeners when closed or not anchored
    if (!open || !anchor) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose, open, anchor]);

  if (!open || !anchor) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-50"
      style={{ top: anchor.top, left: anchor.left }}
    >
      <ul
        role="menu"
        aria-label="Report actions"
        className="bg-white rounded-[16px] shadow-xl w-[360px] overflow-hidden border border-[#E5E5E5] p-2"
      >
        <li role="none">
          <button
            type="button"
            role="menuitem"
            className="w-full flex items-center gap-3 px-2 py-3 rounded-[12px] hover:bg-[#F9FAFB]"
            onClick={() => {
              onMarkReviewed();
              onClose();
            }}
          >
            <BsCheckCircle className="text-[#272727]" size={20} />
            <span className="text-[#272727] text-[1rem]">Mark as Reviewed</span>
          </button>
        </li>

        {showRemove && (
          <li role="none">
            <div className="my-1 h-px bg-[#E5E5E5]" />
          </li>
        )}

        {showRemove && (
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="w-full flex items-center gap-3 px-2 py-3 rounded-[12px] hover:bg-[#FFF5F5]"
              onClick={() => {
                if (onRemoveContent) onRemoveContent();
                onClose();
              }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md border border-[#CB1A14]">
                <RxCross2 className="text-[#CB1A14]" size={16} />
              </span>
              <span className="text-[#CB1A14] text-[1rem]">Remove Content</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

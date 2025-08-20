import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactUsModal = ({
  setIsOpenContactUsModal,
}: {
  setIsOpenContactUsModal: (value: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4  z-50">
      <div className="p-[48px] relative bg-white flex flex-col items-center justify-center gap-[32px] rounded-lg shadow-xl max-w-[504px] w-full mx-4 max-h-[90vh] overflow-hidden">
        <X
          onClick={() => setIsOpenContactUsModal(false)}
          className="absolute top-4 right-4 cursor-pointer text-[#7B7B7B]"
        />
        <Image
          src="/contactUs.gif"
          alt="contact-us-modal-icon"
          width={300}
          height={200}
          className="w-[300px] h-[200px] object-contain"
        />
        <div className="flex flex-col gap-[16px] items-center justify-center">
          <h3 className="text-2xl font-bold text-[#303237] text-[24px] text-center">
            🎉 Message Sent!
          </h3>
          <p className="text-[#303237] text-[14px] font-normal text-center">
            Thanks for reaching out! We&apos;ve received your message and will
            get back to you as soon as possible.
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="py-[12px] w-full bg-[#2853A6] rounded-[8px] transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ContactUsModal;

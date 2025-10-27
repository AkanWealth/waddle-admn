import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DeleteAccountModal = ({
  setIsOpenDeleteAccountModal,
}: {
  setIsOpenDeleteAccountModal: (value: boolean) => void;
}) => {
  const router = useRouter();

  const handleClose = () => {
    setIsOpenDeleteAccountModal(false);
    // Optional: Clear any auth tokens/session here
    router.push("/");
  };

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
      <div className="p-[48px] relative bg-white flex flex-col items-center justify-center gap-[32px] rounded-lg shadow-xl max-w-[504px] w-full mx-4 max-h-[90vh] overflow-hidden">
        <X
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-[#7B7B7B]"
        />
        <Image
          src="/contactUs.gif"
          alt="delete-account-modal-icon"
          width={300}
          height={200}
          className="w-[300px] h-[200px] object-contain"
        />
        <div className="flex flex-col gap-[16px] items-center justify-center">
          <h3 className="text-2xl font-bold text-[#303237] text-[24px] text-center">
            Account Deleted Successfully
          </h3>
          <p className="text-[#303237] text-[14px] font-normal text-center">
            Your account has been permanently deleted. We&apos;re sorry to see
            you go. If you ever change your mind, you&apos;re always welcome
            back.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="py-[12px] w-full text-white bg-[#2853A6] rounded-[8px] transition-colors cursor-pointer hover:bg-[#1e3f7a]"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

import { CircleCheck } from "lucide-react";

const ApprovePlaceModal = () => {
  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4  z-50">
      <div className="bg-white rounded-lg shadow-xl my-4 max-w-[529px] px-2 py-2.5 w-full max-h-screen overflow-y-auto">
        <div className="">
          <div className="bg-[#CDFFE9]   flex items-center justify-center rounded-full">
            <CircleCheck className="text-[#33cc8a] " />
          </div>
          <div className="">
            <h3 className="font-semibold text-xl text-[#303237]">Approve This Place?</h3>
            <p className="text-[#565C69] text-[15px]">
              You&apos;re about to approve this parent-recommended place. Once
              approved, it will be published to the app and visible under
              “Parent Recommendations.”
            </p>
          </div>
        </div>
        <div className="flex mt-3.5 gap-4">
          <button
            type="button"
            className="bg-[#2853A6] rounded-xl text-[#FFFFFF] flex-1 py-2"
          >
            Approve & Publish
          </button>
          <button type="button" className="border border-[#2853A6] text-[#2853A6] rounded-xl flex-1 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovePlaceModal;

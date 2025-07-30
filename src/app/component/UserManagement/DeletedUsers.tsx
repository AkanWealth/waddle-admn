import { Trash2, XCircle } from "lucide-react";

const deletedUsersList = [
  {
    name: "John Doe",
    deletionDate: "2021-01-01",
    deletionTime: "12:00:00",
    reason: "Reason for deletion",
  },
];
console.log(deletedUsersList);
const DeletedUsers = () => {
  return (
    <div className="h-screen fixed top-0 left-0 w-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <section className="w-full max-w-[80vh] bg-white rounded-xl shadow-2xl p-6 text-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-[#F6AAA8] rounded-full p-1">
                <Trash2 className="w-5 h-5 text-[#CC0000]" />
              </div>
              <h3 className="text-[#303237] text-[20px] font-semibold ">
                Deleted Users <span className="text-red-500">(5)</span>
              </h3>
            </div>
            <XCircle className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <table className="w-full my-8">
          <thead>
            <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] py-4">
              <th className="text-[#7B7B7B] text-[16px] font-semibold py-2">
                Name
              </th>
              <th className="text-[#7B7B7B] text-[16px] font-semibold py-2">
                Deletion Date
              </th>
              <th className="text-[#7B7B7B] text-[16px] font-semibold py-2">
                Deletion Time
              </th>
              <th className="text-[#7B7B7B] text-[16px] font-semibold py-2">
                Reason
              </th>
            </tr>
          </thead>
        </table>

        <p className="text-gray-500 mt-2">
          You currently have no deleted users.
        </p>
      </section>
    </div>
  );
};

export default DeletedUsers;

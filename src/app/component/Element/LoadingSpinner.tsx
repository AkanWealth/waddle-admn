export const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="space-y-4 p-6">
      {/* Table header skeleton */}
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-3">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="h-6 bg-gray-100 rounded" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const BookingTableSkeleton: React.FC = () => (
  <div className="overflow-x-auto w-full">
    <div className="animate-pulse">
      {/* Table Header */}
      <div className="bg-[#F7F7F7] hidden md:block">
        <div className="grid grid-cols-6 gap-4 px-4 py-3">
          {[
            "Event Name",
            "Booking ID",
            "Organiser Name",
            "Date",
            "Status",
            "Actions",
          ].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded" />
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white divide-y divide-gray-200">
        {Array.from({ length: 7 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`${
              rowIndex % 2 !== 0 ? "bg-[#F7F7F7]" : ""
            } hover:bg-gray-100 transition-colors md:grid md:grid-cols-6 md:gap-4 block w-full mb-4 md:mb-0 px-4 py-4`}
          >
            {/* Event Name */}
            <div className="md:table-cell block mb-2 md:mb-0">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Event Name:
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Booking ID */}
            <div className="md:table-cell block mb-2 md:mb-0">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Booking ID:
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>

            {/* Organiser Name */}
            <div className="md:table-cell block mb-2 md:mb-0">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Organiser Name:
              </div>
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>

            {/* Date */}
            <div className="md:table-cell block mb-2 md:mb-0">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Date:
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>

            {/* Status */}
            <div className="md:table-cell block mb-2 md:mb-0">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Status:
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            </div>

            {/* Actions */}
            <div className="md:table-cell block">
              <div className="font-semibold block md:hidden text-sm text-gray-400 mb-1">
                Actions:
              </div>
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const GuardianDetailsTableSkeleton: React.FC = () => (
  <div className="w-full animate-pulse">
    {/* Table Header */}
    <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-800 py-3 px-3 bg-gray-200 rounded-t border-b">
      {["Guardian Name", "Email", "Phone", "Children", "Count"].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded" />
      ))}
    </div>

    {/* Table Body */}
    <div className="space-y-1">
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-5 gap-2 text-sm text-gray-700 py-3 px-3 bg-white hover:bg-gray-50 border-b border-gray-100 transition-colors"
        >
          {/* Guardian Name */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Email */}
          <div className="h-4 bg-gray-200 rounded w-full" />

          {/* Phone */}
          <div className="h-4 bg-gray-200 rounded w-2/3" />

          {/* Children */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          {/* Count */}
          <div className="h-4 bg-gray-200 rounded w-8 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

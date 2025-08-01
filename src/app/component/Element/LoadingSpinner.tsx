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

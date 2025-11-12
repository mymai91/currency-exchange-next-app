import clsx from 'clsx';

interface Props {
  rows?: number;
}

export function ExchangeRateSkeleton({ rows = 2 }: Props) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-pulse">
      <div className="grid grid-cols-3 gap-4 px-6 py-4 font-medium text-gray-600 text-sm bg-gray-50 border-b border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div></div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-[#1e2a5e] px-6 py-5">
        <div className="h-6 bg-blue-800 rounded w-16"></div>
        <div className="h-6 bg-blue-800 rounded w-8"></div>
      </div>

      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            "grid grid-cols-3 gap-4 px-6 py-5",
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          )}
        >
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}

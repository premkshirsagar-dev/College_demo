export const SkeletonLine = ({ width = "w-full" }) => (
  <div className={`h-3.5 ${width} rounded-full bg-primary-100 dark:bg-dark-surface-2 animate-pulse`} />
);

export const SkeletonCard = () => (
  <div className="rounded-2xl border border-primary-100 dark:border-primary-800 p-5 space-y-3">
    <SkeletonLine width="w-1/3" />
    <SkeletonLine width="w-2/3" />
    <SkeletonLine width="w-1/2" />
  </div>
);

export const SkeletonRow = () => (
  <tr className="border-b border-primary-100 dark:border-primary-800">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <SkeletonLine width={i === 0 ? "w-24" : "w-full"} />
      </td>
    ))}
  </tr>
);

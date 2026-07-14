// The signature visual motif of this app: a collegiate seal bearing the
// student's Admission ID, echoing the wax seals on real transcripts and
// diplomas. Reused in the hero, the registration success step, and the
// student dashboard header.
const SealBadge = ({ admissionId, label = "Admission ID", size = "md" }) => {
  const dims = size === "lg" ? "w-40 h-40" : size === "sm" ? "w-20 h-20" : "w-28 h-28";
  const textSize = size === "lg" ? "text-[11px]" : "text-[9px]";
  const idSize = size === "lg" ? "text-sm" : "text-[11px]";

  return (
    <div className={`relative ${dims} shrink-0`}>
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/70 animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 shadow-[0_8px_24px_-6px_rgba(11,70,56,0.55)] flex flex-col items-center justify-center text-center px-2">
        <span className={`${textSize} tracking-[0.2em] uppercase text-primary-200 font-body`}>
          {label}
        </span>
        <span className={`${idSize} font-mono text-gold-400 font-semibold mt-1 break-all`}>
          {admissionId || "PENDING"}
        </span>
      </div>
    </div>
  );
};

export default SealBadge;

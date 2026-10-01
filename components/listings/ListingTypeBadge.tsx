// Sale = red with white text, Rent = yellow with dark text (white on yellow is unreadable).
// Custom listing types added in the admin fall back to the dark badge.
const STYLES: Record<string, string> = {
  "For Sale": "bg-[#C62828] text-white",
  "For Rent": "bg-[#FACC15] text-ink",
};

export default function ListingTypeBadge({ type, size = "md" }: { type: string; size?: "md" | "lg" }) {
  const colour = STYLES[type] ?? "bg-ink text-white";
  const scale = size === "lg" ? "px-3.5 py-1.5 text-sm" : "px-3 py-1 text-[13px]";
  return (
    <span className={`rounded font-bold uppercase tracking-[0.08em] shadow-md ${colour} ${scale}`}>{type}</span>
  );
}

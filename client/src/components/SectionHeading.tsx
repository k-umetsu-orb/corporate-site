/*
 * Design: Swiss Precision
 * セクション見出し — 英語ラベル（薄いグレー）+ 日本語タイトル
 * 細い水平線でアクセント
 */
interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignClass} mb-10 md:mb-14`}>
      <p
        className={`font-display text-xs font-semibold tracking-[0.25em] uppercase ${
          light ? "text-white/60" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
      <h2
        className={`mt-2 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-12 ${
          light ? "bg-white/30" : "bg-navy"
        } ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm md:text-base leading-relaxed ${
            light ? "text-white/80" : "text-muted-foreground"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

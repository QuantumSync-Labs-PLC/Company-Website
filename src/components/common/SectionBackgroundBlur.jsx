// Shared decorative blur elements used behind full-width sections.
// Import this into sections that need soft background blobs instead
// of duplicating the same positioned divs.
export default function SectionBackgroundBlur({
  topLeftClassName = "pointer-events-none absolute top-0 left-0 w-80 h-80 bg-qs-primary blur-3xl opacity-10 z-0 animate-pulse",
  bottomRightClassName = "pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-qs-accent blur-3xl opacity-10 z-0 animate-pulse",
}) {
  return (
    <>
      <div className={topLeftClassName} />
      <div className={bottomRightClassName} />
    </>
  );
}

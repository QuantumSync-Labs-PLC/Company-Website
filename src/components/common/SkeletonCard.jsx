export default function SkeletonCard() {
  return (
    <div className="glass rounded-glass p-6 animate-pulse flex flex-col gap-3 min-h-[260px]">
      <div className="h-10 w-10 rounded-full bg-qs-primary/20" />
      <div className="h-4 w-3/4 bg-qs-primary/20 rounded" />
      <div className="h-3 w-full bg-qs-primary/10 rounded" />
      <div className="h-3 w-5/6 bg-qs-primary/10 rounded" />
      <div className="mt-auto h-9 w-full bg-qs-primary/20 rounded-glass" />
    </div>
  );
}

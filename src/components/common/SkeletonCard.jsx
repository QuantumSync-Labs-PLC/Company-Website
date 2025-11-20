export default function SkeletonCard() {
  return (
    <div className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 p-7 sm:p-8 animate-pulse flex flex-col gap-4 min-h-[340px] sm:min-h-[390px]">
      <div className="h-20 w-20 rounded-full bg-qs-primary/20 mx-auto" />
      <div className="h-5 w-3/4 bg-qs-primary/20 rounded mx-auto" />
      <div className="h-3 w-full bg-qs-primary/10 rounded" />
      <div className="h-3 w-5/6 bg-qs-primary/10 rounded" />
      <div className="h-3 w-4/5 bg-qs-primary/10 rounded" />
      <div className="mt-auto h-11 w-full bg-qs-primary/20 rounded-glass" />
    </div>
  );
}

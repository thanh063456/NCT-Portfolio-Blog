export default function BlogLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-xl border bg-card p-4">
          <div className="mb-3 h-5 w-3/4 rounded bg-muted" />
          <div className="mb-2 h-4 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

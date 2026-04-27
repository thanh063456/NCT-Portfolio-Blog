import Link from "next/link";

const categories = ["Web", "TypeScript", "Supabase", "Hoc tap", "Project notes"];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-xl border bg-card p-4">
        <h2 className="mb-3 font-semibold">Danh muc</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {categories.map((category) => (
            <li key={category}>
              <Link href="/blog" className="hover:text-primary">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div>{children}</div>
    </div>
  );
}

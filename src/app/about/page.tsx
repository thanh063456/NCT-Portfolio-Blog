import { Counter } from "@/components/counter";

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ve toi</h1>
        <p className="text-muted-foreground">
          Toi la Ngo Cong Thanh, sinh vien CNTT khoa 2022 tai Dai hoc Da Lat.
          Minh yeu thich xay dung san pham web huu ich cho sinh vien va cong dong.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-card p-5">
          <h2 className="mb-2 text-xl font-semibold">Ky nang</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Next.js App Router, React, TypeScript strict</li>
            <li>Node.js, REST API, PostgreSQL, Supabase</li>
            <li>Tailwind CSS, shadcn/ui, UX co kha nang responsive</li>
          </ul>
        </article>

        <article className="rounded-xl border bg-card p-5">
          <h2 className="mb-2 text-xl font-semibold">So thich</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Doc sach ve cong nghe va thiet ke he thong</li>
            <li>Chup anh canh quan Da Lat</li>
            <li>Viet blog chia se kinh nghiem hoc lap trinh</li>
          </ul>
        </article>
      </div>

      <Counter />
    </section>
  );
}

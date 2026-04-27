import { Counter } from "@/components/counter";

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Về tôi</h1>
        <p className="text-muted-foreground">
          Tôi là Ngô Công Thành, sinh viên CNTT khóa 2022 tại Đại học Đà Lạt.
          Mình yêu thích xây dựng sản phẩm web hữu ích cho sinh viên và cộng đồng.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border bg-card/90 p-5 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Kỹ năng</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Next.js App Router, React, TypeScript strict</li>
            <li>Node.js, REST API, PostgreSQL, Supabase</li>
            <li>Tailwind CSS, shadcn/ui, UX tối ưu responsive</li>
          </ul>
        </article>

        <article className="rounded-2xl border bg-card/90 p-5 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Sở thích</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Đọc sách về công nghệ và thiết kế hệ thống</li>
            <li>Chụp ảnh cảnh quan Đà Lạt</li>
            <li>Viết blog chia sẻ kinh nghiệm học lập trình</li>
          </ul>
        </article>
      </div>

      <Counter />
    </section>
  );
}

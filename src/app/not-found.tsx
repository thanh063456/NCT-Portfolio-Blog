import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border bg-card p-10 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">404</p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">Trang ban tim khong ton tai</h1>
      <p className="mb-6 text-sm text-muted-foreground">Hay quay lai trang chu de tiep tuc kham pha.</p>
      <Button render={<Link href="/" />}>Ve trang chu</Button>
    </section>
  );
}

import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/server";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Dự án" },
  { href: "/guestbook", label: "Lưu bút" },
  { href: "/contact", label: "Liên hệ" },
];

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.display_name ?? user?.email ?? "Khách";
  const avatarLetter = String(displayName).charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary transition hover:opacity-90">
          NCT Portfolio
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/80 p-1 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!user ? (
            <>
              <Button variant="outline" render={<Link href="/login" />}>
                Đăng nhập
              </Button>
              <Button render={<Link href="/register" />}>Đăng ký</Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>{avatarLetter}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  Trang quản trị
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <form action={signOut} className="w-full">
                    <button type="submit" className="w-full text-left">
                      Đăng xuất
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border px-3 py-2 text-sm">
            Danh mục
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-card p-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-2">
              {!user ? (
                <div className="flex gap-2 px-2 pb-1">
                  <Button className="w-full" variant="outline" render={<Link href="/login" />}>
                    Đăng nhập
                  </Button>
                  <Button className="w-full" render={<Link href="/register" />}>
                    Đăng ký
                  </Button>
                </div>
              ) : (
                <div className="space-y-1 px-2 pb-1">
                  <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                    Trang quản trị
                  </Link>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-muted"
                    >
                      Đăng xuất
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

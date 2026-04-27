import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Đăng nhập</h1>
      <LoginForm />
    </section>
  );
}

import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Đăng ký</h1>
      <RegisterForm />
    </section>
  );
}

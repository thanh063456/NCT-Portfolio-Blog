"use client";

import { useActionState } from "react";

import { sendContactAction, type ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = {};

export default function ContactPage() {
  const [state, action, pending] = useActionState(sendContactAction, initialState);

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Liên hệ</h1>
      <form action={action} className="space-y-4 rounded-2xl border bg-card/95 p-5 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="name">Họ tên</Label>
          <Input id="name" name="name" placeholder="Nhập họ tên" />
          {state.errors?.name ? <p className="text-sm text-destructive">{state.errors.name}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="name@example.com" />
          {state.errors?.email ? <p className="text-sm text-destructive">{state.errors.email}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Nội dung</Label>
          <Textarea id="message" name="message" rows={5} placeholder="Vui lòng để lại lời nhắn" />
          {state.errors?.message ? <p className="text-sm text-destructive">{state.errors.message}</p> : null}
        </div>

        {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}

        <Button type="submit" disabled={pending}>
          {pending ? "Đang gửi..." : "Gửi liên hệ"}
        </Button>
      </form>
    </section>
  );
}

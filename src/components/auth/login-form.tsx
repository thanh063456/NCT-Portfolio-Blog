"use client";

import { useActionState } from "react";

import { signIn, signInWithGitHub, type AuthState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="space-y-4 rounded-xl border bg-card p-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Dang dang nhap..." : "Dang nhap"}
      </Button>
      <Button formAction={signInWithGitHub} type="submit" variant="outline" className="w-full">
        Dang nhap voi GitHub
      </Button>
    </form>
  );
}

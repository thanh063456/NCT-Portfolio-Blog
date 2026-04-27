"use client";

import { useActionState, useState } from "react";

import { signUp, type AuthState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthState = {};

export function RegisterForm() {
  const [state, action, pending] = useActionState(signUp, initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const isMismatch = confirmPassword.length > 0 && confirmPassword !== password;

  return (
    <form action={action} className="space-y-4 rounded-xl border bg-card p-5">
      <div className="space-y-2">
        <Label htmlFor="display_name">Ho ten</Label>
        <Input id="display_name" name="display_name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Xac nhan password</Label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      {isMismatch ? <p className="text-sm text-destructive">Mat khau xac nhan khong khop</p> : null}
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
      <Button type="submit" className="w-full" disabled={pending || isMismatch}>
        {pending ? "Dang tao tai khoan..." : "Dang ky"}
      </Button>
    </form>
  );
}

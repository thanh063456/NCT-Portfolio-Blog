"use client";

import { useActionState, useEffect, useState } from "react";

import { addEntryAction, type GuestbookState } from "@/app/actions/guestbook";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { GuestbookEntry } from "@/types/database";

const initialState: GuestbookState = {};

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, action, pending] = useActionState(addEntryAction, initialState);

  const loadEntries = async () => {
    setLoading(true);
    const response = await fetch("/api/guestbook");
    const data = (await response.json()) as GuestbookEntry[];
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    void loadEntries();
  }, []);

  useEffect(() => {
    if (state.success) {
      void loadEntries();
    }
  }, [state.success]);

  const deleteEntry = async (id: string) => {
    await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
    await loadEntries();
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Guestbook</h1>

      <form action={action} className="space-y-4 rounded-xl border bg-card p-5">
        <div className="space-y-2">
          <Label htmlFor="name">Ten</Label>
          <Input id="name" name="name" placeholder="Nguoi ghi" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Loi nhan</Label>
          <Textarea id="message" name="message" rows={4} placeholder="Hay de lai loi nhan..." />
        </div>
        {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Dang gui..." : "Them loi nhan"}
        </Button>
      </form>

      <div className="space-y-3">
        {loading ? <p className="text-sm text-muted-foreground">Dang tai du lieu...</p> : null}
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="space-y-2 py-4">
              <div className="flex items-center justify-between gap-3">
                <strong>{entry.name}</strong>
                <button
                  type="button"
                  className="text-sm text-destructive hover:underline"
                  onClick={() => deleteEntry(entry.id)}
                >
                  Xoa
                </button>
              </div>
              <p className="text-sm text-muted-foreground">{entry.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useActionState } from "react";

import { savePost, type PostState } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/types/database";

const initialState: PostState = {};

export function PostForm({ initialData }: { initialData?: Post | null }) {
  const [state, action, pending] = useActionState(savePost, initialState);

  return (
    <form action={action} className="space-y-4 rounded-xl border bg-card p-5">
      {initialData?.id ? <input type="hidden" name="id" value={initialData.id} /> : null}
      <div className="space-y-2">
        <Label htmlFor="title">Tieu de</Label>
        <Input id="title" name="title" defaultValue={initialData?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Tom tat</Label>
        <Input id="excerpt" name="excerpt" defaultValue={initialData?.excerpt ?? ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Noi dung</Label>
        <Textarea id="content" name="content" rows={10} defaultValue={initialData?.content} required />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Trang thai</legend>
        <label className="mr-4 text-sm">
          <input type="radio" name="status" value="draft" defaultChecked={initialData?.status !== "published"} /> Draft
        </label>
        <label className="text-sm">
          <input type="radio" name="status" value="published" defaultChecked={initialData?.status === "published"} /> Published
        </label>
      </fieldset>
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Dang luu..." : "Luu bai viet"}
      </Button>
    </form>
  );
}

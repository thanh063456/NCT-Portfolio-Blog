"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Tieu de phai tu 3 ky tu"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Noi dung phai tu 10 ky tu"),
  status: z.enum(["draft", "published"]),
});

export type PostState = {
  error?: string;
  success?: string;
};

export async function savePost(_prevState: PostState, formData: FormData): Promise<PostState> {
  const parsed = postSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || "",
    content: formData.get("content"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Ban chua dang nhap" };
  }

  const payload = {
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    status: parsed.data.status,
    author_id: user.id,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("posts").update(payload).eq("id", parsed.data.id);
    if (error) {
      return { error: error.message };
    }
  } else {
    const { error } = await supabase.from("posts").insert(payload);
    if (error) {
      return { error: error.message };
    }
  }

  revalidatePath("/dashboard");
  return { success: "Da luu bai viet" };
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

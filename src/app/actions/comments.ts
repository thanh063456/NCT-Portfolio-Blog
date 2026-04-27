"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const commentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1, "Nội dung không được để trống"),
});

export async function addComment(postId: string, content: string) {
  const parsed = commentSchema.safeParse({ postId, content });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vui lòng đăng nhập để bình luận" };
  }

  const { error } = await supabase.from("comments").insert({
    post_id: parsed.data.postId,
    author_id: user.id,
    content: parsed.data.content,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/posts/${postId}`);
  return { success: true };
}

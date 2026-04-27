"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const guestbookSchema = z.object({
  name: z.string().min(2, "Tên phải từ 2 ký tự"),
  message: z.string().min(5, "Lời nhắn phải từ 5 ký tự"),
});

export type GuestbookState = {
  error?: string;
  success?: string;
};

export async function addEntryAction(
  _prevState: GuestbookState,
  formData: FormData
): Promise<GuestbookState> {
  const parsed = guestbookSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("guestbook").insert(parsed.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/guestbook");
  return { success: "Đã thêm lời nhắn" };
}

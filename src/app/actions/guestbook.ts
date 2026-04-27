"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const guestbookSchema = z.object({
  name: z.string().min(2, "Ten phai tu 2 ky tu"),
  message: z.string().min(5, "Loi nhan phai tu 5 ky tu"),
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
    return { error: parsed.error.issues[0]?.message ?? "Du lieu khong hop le" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("guestbook").insert(parsed.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/guestbook");
  return { success: "Da them loi nhan" };
}

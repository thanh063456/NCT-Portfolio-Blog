"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Ten phai co it nhat 2 ky tu"),
  email: z.email("Email khong hop le"),
  message: z.string().min(10, "Noi dung phai co it nhat 10 ky tu"),
});

export type ContactFormState = {
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
  success?: string;
};

export async function sendContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      errors: {
        name: parsed.error.flatten().fieldErrors.name?.[0],
        email: parsed.error.flatten().fieldErrors.email?.[0],
        message: parsed.error.flatten().fieldErrors.message?.[0],
      },
    };
  }

  return {
    success: "Cam on ban! Minh da nhan duoc lien he.",
  };
}

"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.email("Email không hợp lệ"),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
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
    success: "Cảm ơn bạn! Mình đã nhận được liên hệ.",
  };
}

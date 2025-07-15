"use server";

import { signupSchema } from "@/types/auth";
import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function signup(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || undefined,
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { message: "Validation failed" };
  }

  try {
    const res = await api.post("/auth/signup", result.data);

    const { accessToken } = res.data;

    const cookieStore = cookies();
    cookieStore.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { message: "" };
  } catch (error: any) {
    return { message: error?.response?.data?.message || "Signup failed" };
  }
}

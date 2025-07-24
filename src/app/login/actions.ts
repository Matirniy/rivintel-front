"use server";

import { cookies } from "next/headers";

import { loginSchema } from "@/types/auth";
import { AuthService } from "@/api";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { message: "Validation failed" };
  }

  try {
    const res = await AuthService.login(result.data);
    const { accessToken, user } = res.data;

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { message: "login", user };
  } catch (err: any) {
    console.error("Login error:", err?.response?.data || err.message);
    return { message: "Invalid credentials" };
  }
}

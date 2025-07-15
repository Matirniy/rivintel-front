"use server";

import { loginSchema } from "@/types/auth";
import api from "@/lib/axios";
import { cookies } from "next/headers";

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
    const res = await api.post("/auth/login", result.data);

    const { accessToken } = res.data;

    cookies().set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { message: "" };
  } catch (err: any) {
    console.error("Login error:", err?.response?.data || err.message);
    return { message: "Invalid credentials" };
  }
}

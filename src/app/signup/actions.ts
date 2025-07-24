"use server";

import { cookies } from "next/headers";

import { AuthService } from "@/api";
import { signupSchema } from "@/types/auth";

export async function signup(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || undefined,
    userName: formData.get("userName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { message: result.error.message };
  }

  try {
    const res = await AuthService.signup(result.data);

    const { accessToken, user } = res?.data;

    if (!accessToken) {
      return { message: "No token received" };
    }

    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return {
      message: "signup",
      user,
    };
  } catch (error: any) {
    return {
      message: error?.body?.message || error?.message || "Signup failed",
    };
  }
}

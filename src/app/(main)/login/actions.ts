"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/types/auth";
import { login, type Users } from "@/app/api/gen";

type SignInResult =
  | { message: "login"; user: Users }
  | { message: "Validation failed" | "Invalid credentials" | "" };

export async function signIn(
  prevState: unknown,
  formData: FormData
): Promise<SignInResult> {
  const data = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { message: "Validation failed" };
  }

  try {
    const { data } = await login({
      body: result.data,
    });

    const { accessToken, refreshToken, user } = data as {
      accessToken: string;
      refreshToken: string;
      user: Users;
    };

    const cookieStore = await cookies();

    if (!refreshToken) {
      throw new Error("Login failed: Token is missing");
    }

    cookieStore.set("accessToken", accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return { message: "login", user };
  } catch (err: any) {
    console.error("Login error:", err?.response?.data || err.message);
    return { message: "Invalid credentials" };
  }
}

"use server";

import { cookies } from "next/headers";

import { signupSchema } from "@/types/auth";
import { signup } from "@/app/api/gen";

export async function register(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name")?.toString(),
    userName: formData.get("userName")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    advertisingId: formData.get("advertisingId")?.toString(),
  };

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { message: result.error.message };
  }

  try {
    const { data } = await signup({
      body: result.data,
    });

    const { accessToken, user } = data;

    if (!accessToken) {
      return { message: "No token received" };
    }

    const cookieStore = await cookies();

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

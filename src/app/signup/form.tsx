"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { register } from "./actions";
import { useAuthStore } from "@/store/auth";
import { LoadingButton } from "@/components/shared/loadingButton";

export default function SignupForm({ action }: { action: typeof register }) {
  const [state, formAction, isPending] = useActionState(action, {
    message: "",
  });
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.message === "signup" && state.user) {
      setUser(state.user);

      if (state.user.isSubscribed) {
        router.push("/dashboard");
      } else {
        router.push("/payment");
      }
    }
  }, [state, setUser, router]);

  const prepareFormData = (formData: FormData) => {
    setName(formData.get("name")?.toString() || "");
    setUserName(formData.get("userName")?.toString() || "");
    setEmail(formData.get("email")?.toString() || "");
    setPassword(formData.get("password")?.toString() || "");
    const advertisingId = localStorage.getItem("advertisingId");

    if (advertisingId) {
      formData.set("advertisingId", advertisingId);
    }

    return formData;
  };

  return (
    <form
      action={(formData: FormData) => formAction(prepareFormData(formData))}
      className="card bg-base-100 shadow-2xl p-6 space-y-4 w-80"
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <input
        name="name"
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        name="userName"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      {state?.message && state.message !== "signup" && (
        <div className="text-error text-sm">{state.message}</div>
      )}

      <LoadingButton type="submit" isLoading={isPending}>
        Create Account
      </LoadingButton>

      <div className="text-center">
        <span className="text-sm">Already have an account?</span>{" "}
        <Link href="/login" className="link link-primary text-sm">
          Log In
        </Link>
      </div>
    </form>
  );
}

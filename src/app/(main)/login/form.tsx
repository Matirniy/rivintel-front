"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { signIn } from "./actions";
import { useAuthStore } from "@/store/auth";
import { LoadingButton } from "@/components/shared/loadingButton";

export default function LoginForm({ action }: { action: typeof signIn }) {
  const [state, formAction, isPending] = useActionState(action, {
    message: "",
  });
  const setUser = useAuthStore((store) => store.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.message === "login" && state.user) {
      setUser(state.user);

      if (state.user.isSubscribed) {
        router.push("/dashboard");
      } else {
        router.push("/payment");
      }
    }
  }, [state, setUser, router]);

  return (
    <form
      action={(formData) => {
        setEmail(formData.get("email")?.toString() || "");
        setPassword(formData.get("password")?.toString() || "");

        return formAction(formData);
      }}
      className="card bg-base-100 shadow-2xl p-6 space-y-4 w-80"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {state?.message && state.message !== "login" && (
        <div className="text-error text-sm">{state.message}</div>
      )}

      <LoadingButton type="submit" isLoading={isPending}>
        Log In
      </LoadingButton>

      <div className="text-center">
        <span className="text-sm">Don&apos;t have an account?</span>{" "}
        <Link href="/signup" className="link link-primary text-sm">
          Sign Up
        </Link>
      </div>
    </form>
  );
}

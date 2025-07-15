"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { login } from "./actions";

export default function LoginForm({ action }: { action: typeof login }) {
  const [state, formAction] = useActionState(action, { message: "" });

  return (
    <form
      action={formAction}
      className="card bg-base-100 shadow-2xl p-6 space-y-4 w-80"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        required
      />

      {state?.message && (
        <div className="text-error text-sm">{state.message}</div>
      )}

      <button type="submit" className="btn btn-primary w-full">
        Log In
      </button>

      <div className="text-center">
        <span className="text-sm">Don&apos;t have an account?</span>{" "}
        <Link href="/signup" className="link link-primary text-sm">
          Sign Up
        </Link>
      </div>
    </form>
  );
}

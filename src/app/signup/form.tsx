"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { signup } from "./actions";

export default function SignupForm({ action }: { action: typeof signup }) {
  const [state, formAction] = useActionState(action, { message: "" });

  return (
    <form
      action={formAction}
      className="card bg-base-100 shadow-2xl p-6 space-y-4 w-80"
    >
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>

      <input
        name="name"
        type="text"
        placeholder="Name (optional)"
        className="input input-bordered w-full"
      />
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="input input-bordered w-full"
        required
      />
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
        Create Account
      </button>

      <div className="text-center">
        <span className="text-sm">Already have an account?</span>{" "}
        <Link href="/login" className="link link-primary text-sm">
          Log In
        </Link>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState, } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth";
import {
  initializePaddle,
  type Paddle,
  type Environments,
} from "@paddle/paddle-js";
import { LoadingButton } from "@/components/shared/loadingButton";

export default function ProSubscriptionCard() {
  const router = useRouter();
  const { user, hydrated } = useAuthStore();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const priceId = process.env.NEXT_PUBLIC_BASIC_PRICE_ID;

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/signup");
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    if (
      !paddle?.Initialized &&
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_ENV
    ) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        checkout: {
          settings: {
            successUrl: "/payment/success",
          },
        },
      }).then((paddle) => {
        setPaddle(paddle);
      });
    }
  }, [paddle?.Initialized]);

  const handleCheckout = () => {
    if (!paddle || !priceId) return;

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: {
        userId: user?.id,
      },
      ...(user?.email && { customer: { email: user.email } }),
    });
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-112px)] md:h-full">
      <div className="card w-80 bg-linear-to-b from-blue-700 to-blue-900 text-white shadow-xl rounded-xl p-6 relative">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full mr-3">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Basic</h2>
        </div>

        <div className="mb-4">
          <span className="text-4xl font-extrabold">$10</span>
          <span className="block text-sm text-blue-200">per user/month</span>
        </div>

        <p className="mb-6 text-blue-100 text-lg font-bold">
          Full access to all features
        </p>

        <ul className="mb-4 space-y-2 text-blue-100">
          <li className="flex items-center mb-4 text-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Discover every company in your radius
          </li>
          <li className="flex items-center mb-4 text-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Get complete business information
          </li>
          <li className="flex items-center mb-4 text-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Export all data to Excel effortlessly
          </li>
          <li className="flex items-center mb-4 text-sm">
            <svg
              className="w-4 h-4 mr-2 text-blue-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            AI-powered analytics for smarter decisions
          </li>
        </ul>

        <LoadingButton onClick={handleCheckout} className="w-full">
          Subscribe
        </LoadingButton>
      </div>
    </div>
  );
}

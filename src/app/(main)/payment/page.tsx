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

  const features = [
    "Discover every company in your radius",
    "Get complete business information",
    "Export all data to Excel effortlessly",
    "AI-powered analytics for smarter decisions",
  ];

  return (
    <div className="flex items-center justify-center h-[calc(100vh-112px)] px-4 py-8 md:h-full">
      <div className="card w-full max-w-sm bg-linear-to-b from-primary to-primary/80 text-primary-content shadow-xl rounded-xl p-5 sm:p-6 relative">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-primary-content/15 rounded-full mr-3">
            <svg
              className="w-5 h-5"
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
          <span className="block text-sm text-primary-content/70">
            per user/month
          </span>
        </div>

        <p className="mb-6 text-primary-content/90 text-lg font-bold">
          Full access to all features
        </p>

        <ul className="mb-4 space-y-3 text-primary-content/90">
          {features.map((feature) => (
            <li key={feature} className="flex items-start text-sm">
              <svg
                className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-primary-content/70"
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
              {feature}
            </li>
          ))}
        </ul>

        <LoadingButton
          onClick={handleCheckout}
          className="w-full !bg-base-100 !text-primary !border-none hover:!brightness-95"
        >
          Subscribe
        </LoadingButton>
      </div>
    </div>
  );
}

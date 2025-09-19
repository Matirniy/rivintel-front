"use client";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/shared/loadingButton";

export default function SuccessPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-112px)] md:h-full">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-xl font-bold">✅ Payment Successful!</h2>
        <p className="mt-2 mb-6">Your subscription is now active.</p>

        <LoadingButton onClick={handleRedirect} className="w-full">
          Go to dashboard
        </LoadingButton>
      </div>
    </div>
  );
}

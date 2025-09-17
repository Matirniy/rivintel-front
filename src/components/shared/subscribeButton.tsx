"use client";

import { Users } from "@/app/api/gen";
import { useRouter } from "next/navigation";

const SubscriptionButton = ({ user }: { user: Users | null }) => {
  const router = useRouter();

  const handleClick = () => {
    if (user?.id) {
      router.push("/payment");
    } else {
      router.push("/signup");
    }
  };

  return (
    <button
      className="btn btn-primary hover:brightness-115 transition duration-200 pointer-events-auto"
      onClick={handleClick}
    >
      Buy subscription for full information
    </button>
  );
};

export default SubscriptionButton;

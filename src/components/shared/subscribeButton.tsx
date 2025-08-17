"use client";

import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

const SubscriptionButton = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  const handleClick = () => {
    if (true) {
      router.push("/subscription");
    } else {
      router.push("/signup");
    }
  };

  return (
    <button
      className="btn btn-primary hover:brightness-115 transition duration-200 pointer-events-auto"
      onClick={handleClick}
    >
      Buy subscription for full info
    </button>
  );
};

export default SubscriptionButton;

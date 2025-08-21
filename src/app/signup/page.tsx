import { signup } from "./actions";
import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="h-full flex items-center justify-center bg-base-200 h-[calc(100vh-112px)] md:h-full">
      <SignupForm action={signup} />
    </div>
  );
}

import { signup } from "./actions";
import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="relative z-10">
        <SignupForm action={signup} />
      </div>
    </div>
  );
}

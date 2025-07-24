import { signup } from "./actions";
import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="h-full flex items-center justify-center bg-base-200">
      <SignupForm action={signup} />
    </div>
  );
}

import { login } from "./actions";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="relative z-10">
        <LoginForm action={login} />
      </div>
    </div>
  );
}

import { login } from "./actions";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center bg-base-200">
      <LoginForm action={login} />
    </div>
  );
}

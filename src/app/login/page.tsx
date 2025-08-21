import { login } from "./actions";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-base-200 h-[calc(100vh-112px)] md:h-full">
      <LoginForm action={login} />
    </div>
  );
}

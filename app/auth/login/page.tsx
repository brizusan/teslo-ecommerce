import { titleFont } from "@/src/config/fonts";
import { LoginForm } from "./components/LoginForm";

export default function AuthLoginPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52 max-w-sm  w-11/12  mx-auto">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </main>
  );
}

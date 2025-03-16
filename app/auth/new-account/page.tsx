import { titleFont } from "@/src/config/fonts";
import { RegisterForm } from "./components/RegisterForm";

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32  max-w-sm w-11/12  mx-auto">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva Cuenta</h1>

      <RegisterForm />
    </main>
  );
}

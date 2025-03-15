import { auth } from "@/src/auth.config";
import { Title } from "@/src/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="px-10">
      <Title
        title="Profile"
        subtitle={`Pagina de usuario : ${session.user.name} , del tipo ${session.user.role}`}
        className="mb-2"
      />

      <div>{JSON.stringify(session.user, null, 2)}</div>
    </div>
  );
}

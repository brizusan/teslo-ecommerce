import { getUsers } from "@/src/actions";
import { Title } from "@/src/components";
import { Metadata } from "next";
import { UserTable } from "./components/UserTable";

export const metadata: Metadata = {
  title: {
    template: "%s - Ordenes",
    default: "Todas las Ordenes",
  },
  description:
    "Administracion de ordenes , gestiona tus ordenes , vista de pedidos realizados",
};

export default async function UsersAdminPage() {
  const users = await getUsers();

  const isEmpty = users.length === 0;

  return (
    <section className="px-10">
      <Title
        title="Gestionar Usuarios | Admin"
        subtitle="A continuacion tenemos todas las informacion de los usuarios registrados hasta el momento"
      />

      {isEmpty && (
        <div className="mt-20  min-h-[20vh] lg:min-h-[40vh]">
          <p className="text-center text-2xl">
            No tenemos usuario para mostrar
          </p>
        </div>
      )}
      {!isEmpty && (
        <div className="my-10 max-w-[1380px] mx-auto min-h-[40vh]">
          <UserTable users={users} />
        </div>
      )}
    </section>
  );
}

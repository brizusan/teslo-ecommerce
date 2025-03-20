import { getUserAddress } from "@/src/actions";
import { auth } from "@/src/auth";
import { Title } from "@/src/components";
import { prisma } from "@/src/config/client";
import { redirect } from "next/navigation";
import { AddressForm } from "./components/AddressForm";

async function getCountries() {
  return await prisma.country.findMany();
}

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user) return redirect("/auth/login");

  const userAddress = await getUserAddress(session.user.id);

  // if (!userAddress) return <p>...No hay direcciones guardadas</p>;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 lg:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userAddress={userAddress!} />
      </div>
    </div>
  );
}

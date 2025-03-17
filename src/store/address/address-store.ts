import { Address } from "@/src/schemas";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StateStore = {
  address: Address;
  setAdress: (address: Address) => void;
};

const initialAdress: Address = {
  name: "",
  lastName: "",
  address: "",
  address2: "",
  postalCode: "",
  city: "",
  country: "",
  phone: "",
  rememberAdress: false,
};

export const useAdressStore = create<StateStore>()(
  persist(
    (set, get) => ({
      address: initialAdress,
      setAdress: (address) => set({ address }),
    }),
    {
      name: "address-store",
    }
  )
);

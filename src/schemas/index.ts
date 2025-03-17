import z from "zod";
export const AddressSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es requerido" }),
  lastName: z.string().nonempty({ message: "Los apellidos son requeridos" }),
  address: z.string().nonempty({ message: "La direccion es requerida" }),
  address2: z.string().optional(),
  postalCode: z.string().nonempty({ message: "El codigo postal es requerido" }),
  city: z.string().nonempty({ message: "La ciudad es requerida" }),
  country: z.string().nonempty({ message: "El pais es requerido" }),
  phone: z
    .string()
    .nonempty({ message: "El telefono es requerido" })
    .regex(/^\d{3}-\d{3}-\d{3}$/, {
      message: "El número debe tener el formato xxx-xxx-xxx",
    }),
  rememberAdress: z.boolean().optional(),
});

export type Address = z.infer<typeof AddressSchema>;

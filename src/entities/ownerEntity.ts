import { z } from "zod";

export const OwnerEschema = z.object({
  id: z.int().positive().optional(),
  nombre: z.string().min(1, "Nombre requerido").max(150, "Maximo 150 caracteres"),
  email: z.email().max(150, "Maximo 150 caracteres"),
  telefono: z.string().regex(/^3\d{9}$/, "Invalid Colombian phone number").max(50, "Maximo 50 caracteres"),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type Owner = z.infer<typeof OwnerEschema>;

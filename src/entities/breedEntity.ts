import { z } from "zod";

export const BreedSchema = z.object({
  id: z.int().positive().optional(),
  nombre: z.string().min(1, "Nombre requerido").max(150, "Maximo 150 caracteres"),
  especie: z.string().min(1, "Especie requerida").max(50, "Maximo 50 caracteres"),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type Breed = z.infer<typeof BreedSchema>;


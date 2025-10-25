import { z } from "zod";

export const PetSchema = z.object({
  id: z.int().positive().optional(),
  nombre: z.string().min(1, "Nombre necesario").max(150, "Maximo 150 caracteres"),
  fechaNacimiento: z.date().optional(),
  sexo: z.literal(["F", "M"]).optional(),
  peso: z.number().optional(),
  ownerId: z.int().positive(),
  breedId: z.int().positive(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export type Pet = z.infer<typeof PetSchema>;

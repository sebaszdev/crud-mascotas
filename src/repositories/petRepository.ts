import { prisma } from "../../prisma/prisma";
import type { Pet } from "../entities/petEntity";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const petRepository = {
  create: async (pet: Pet): Promise<Pet | null> => {
    try {
      const res = await prisma.pets.create({
        data: {
          nombre: pet.nombre,
          fechaNacimiento: pet.fechaNacimiento ?? null,
          sexo: pet.sexo ?? null,
          peso: pet.peso ?? null,
          ownerId: pet.ownerId,
          breedId: pet.breedId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error creando la raza", err);
      return null;
    }
  },
  readAll: async (params: readAllParams): Promise<Pet[] | null> => {
    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 10;

    
    try {
      const res = await prisma.pets.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res;
    } catch (err) {
      console.error("Error leyendo las mascotas de la base de datos", err);
      return null;
    }
  },
  readById: async (petId: number): Promise<Pet | null> => {
    try {
      const res = await prisma.pets.findUnique({
        where: {
          id: petId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error leyendo la mascota de la base de datos", err);
      return null;
    }
  },
  update: async (petId: number, updatedPet: Pet): Promise<Pet| null> => {
    try {
      const res = await prisma.pets.update({
        where: {
          id: petId,
        },
        data: {
          nombre: updatedPet.nombre,
          fechaNacimiento: updatedPet.fechaNacimiento ?? null,
          sexo: updatedPet.sexo ?? null,
          peso: updatedPet.peso ?? null,
          ownerId: updatedPet.ownerId,
          breedId: updatedPet.breedId,
          updatedAt: new Date(),
        }
      });

      return res;
    } catch (err) {
      console.error("Error actualizando la base de datos", err);
      return null;
    }
  },
  delete: async (petId: number): Promise<Pet | null> => {
    try {
      const res = await prisma.pets.delete({
        where: {
          id: petId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error eliminando de la base de datos", err);
      return null;
    }
  }
}

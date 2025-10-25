import { prisma } from "../../prisma/prisma";
import type { Breed } from "../entities/breedEntity";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const breedRepository = {
  create: async (breed: Breed): Promise<Breed | null> => {
    try {
      const res = await prisma.breeds.create({
        data: {
          nombre: breed.nombre,
          especie: breed.especie,
        }
      });

      return res;
    } catch (err) {
      console.error("Error creando la raza", err);
      return null;
    }
  },
  readAll: async (params: readAllParams): Promise<Breed[] | null> => {
    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 10;

    
    try {
      const res = await prisma.breeds.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res;
    } catch (err) {
      console.error("Error leyendo las razas de la base de datos", err);
      return null;
    }
  },
  readById: async (breedId: number): Promise<Breed | null> => {
    try {
      const res = await prisma.breeds.findUnique({
        where: {
          id: breedId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error leyendo la raza de la base de datos", err);
      return null;
    }
  },
  update: async (breedId: number, updatedBreed: Breed): Promise<Breed| null> => {
    try {
      const res = await prisma.breeds.update({
        where: {
          id: breedId,
        },
        data: {
          nombre: updatedBreed.nombre,
          especie: updatedBreed.especie,
          updatedAt: new Date(),
        }
      });

      return res;
    } catch (err) {
      console.error("Error actualizando la base de datos", err);
      return null;
    }
  },
  delete: async (breedId: number): Promise<Breed | null> => {
    try {
      const res = await prisma.breeds.delete({
        where: {
          id: breedId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error eliminando de la base de datos", err);
      return null;
    }
  }
}

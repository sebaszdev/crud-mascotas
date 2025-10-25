import { prisma } from "../../prisma/prisma";
import type { Owner } from "../entities/ownerEntity";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const ownerRepository = {
  create: async (owner: Owner): Promise<Owner | null> => {
    try {
      const res = await prisma.owners.create({
        data: {
          nombre: owner.nombre,
          email: owner.email,
          telefono: owner.telefono ?? null,
        }
      });

      return res;
    } catch (err) {
      console.error("Error creando el dueño", err);
      return null;
    }
  },
  readAll: async (params: readAllParams): Promise<Owner[] | null> => {
    const page = params.page && params.page > 0 ? params.page : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 10;
    
    try {
      const res = await prisma.owners.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return res;
    } catch (err) {
      console.error("Error leyendo los dueños de la base de datos", err);
      return null;
    }
  },
  readById: async (ownerId: number): Promise<Owner | null> => {
    try {
      const res = await prisma.owners.findUnique({
        where: {
          id: ownerId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error leyendo el dueño de la base de datos", err);
      return null;
    }
  },
  update: async (ownerId: number, updatedOwner: Owner): Promise<Owner| null> => {
    const owner = updatedOwner.telefono ? {
      nombre: updatedOwner.nombre,
      email: updatedOwner.email,
      telefono: updatedOwner.telefono,
    } : {
      nombre: updatedOwner.nombre,
      email: updatedOwner.email,
    }

    try {
      const res = await prisma.owners.update({
        where: {
          id: ownerId,
        },
        data: {
          ...owner,
          updatedAt: new Date(),
        }
      });

      return res;
    } catch (err) {
      console.error("Error actualizando la base de datos", err);
      return null;
    }
  },
  delete: async (ownerId: number): Promise<Owner | null> => {
    try {
      const res = await prisma.owners.delete({
        where: {
          id: ownerId,
        }
      });

      return res;
    } catch (err) {
      console.error("Error eliminando de la base de datos", err);
      return null;
    }
  }
}

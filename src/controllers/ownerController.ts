// ...existing code...
import type { Request, Response } from "express";

import z from "zod";
import { ownerRepository } from "../repositories/ownerRepository";
import type { Owner } from "../entities/ownerEntity";
import { OwnerEschema } from "../entities/ownerEntity";

export const ownerController = {
  createOwner: async (req: Request, res: Response) => {
    try {
      const input = { ...req.body } as Record<string, unknown>;

      const parsed = OwnerEschema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const ownerData = parsed.data as Owner;
      const created = await ownerRepository.create(ownerData);
      if (!created) return res.status(500).json({ message: "No se pudo crear el dueño" });

      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  readAllOwners: async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const result = await ownerRepository.readAll({ page, pageSize });
      if (result === null) return res.status(500).json({ message: "Error leyendo los dueños" });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  readOwnerById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const owner = await ownerRepository.readById(id);
      if (!owner) return res.status(404).json({ message: "Dueño no encontrado" });

      return res.status(200).json(owner);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  updateOwner: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const exists = await ownerRepository.readById(id);
      if (!exists) return res.status(404).json({ message: "Dueño no encontrado" });

      const input = { ...req.body } as Record<string, unknown>;
      const PartialOwnerSchema = OwnerEschema.partial();
      const parsed = PartialOwnerSchema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const merged: Owner = { ...exists, ...parsed.data } as Owner;
      const updated = await ownerRepository.update(id, merged);
      if (!updated) return res.status(500).json({ message: "No se pudo actualizar el dueño" });

      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  deleteOwner: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const deleted = await ownerRepository.delete(id);
      if (!deleted) return res.status(404).json({ message: "Dueño no encontrado o no eliminado" });

      return res.status(200).json(deleted);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },
};

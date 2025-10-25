import type { Request, Response } from "express";

import z from "zod";
import { petRepository } from "../repositories/petRepository";
import type { Pet } from "../entities/petEntity";
import { PetSchema } from "../entities/petEntity";

export const studentController = {
  createStudent: async (req: Request, res: Response) => {
    try {
      const input = { ...req.body } as Record<string, unknown>;
      if (typeof input.fechaNacimiento === "string" && input.fechaNacimiento.length > 0) {
        const d = new Date(input.fechaNacimiento);
        input.fechaNacimiento = isNaN(d.getTime()) ? input.fechaNacimiento : d;
      }
      if (typeof input.sexo === "string") {
        const s = input.sexo.toUpperCase();
        input.sexo = s === "F" || s === "M" ? s : input.sexo;
      }

      const parsed = PetSchema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const petData = parsed.data as Pet;
      const created = await petRepository.create(petData);
      if (!created) return res.status(500).json({ message: "No se pudo crear la mascota" });

      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },
  readAllStudents: async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const result = await petRepository.readAll({ page, pageSize });
      if (result === null) return res.status(500).json({ message: "Error leyendo mascotas" });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  readStudentById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const pet = await petRepository.readById(id);
      if (!pet) return res.status(404).json({ message: "Mascota no encontrada" });

      return res.status(200).json(pet);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  updateStudent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const exists = await petRepository.readById(id);
      if (!exists) return res.status(404).json({ message: "Mascota no encontrada" });

      const input = { ...req.body } as Record<string, unknown>;
      if (typeof input.fechaNacimiento === "string" && input.fechaNacimiento.length > 0) {
        const d = new Date(input.fechaNacimiento);
        input.fechaNacimiento = isNaN(d.getTime()) ? input.fechaNacimiento : d;
      }
      if (typeof input.sexo === "string") {
        const s = input.sexo.toUpperCase();
        input.sexo = s === "F" || s === "M" ? s : input.sexo;
      }

      const PartialPetSchema = PetSchema.partial();
      const parsed = PartialPetSchema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const merged: Pet = { ...exists, ...parsed.data } as Pet;
      const updated = await petRepository.update(id, merged);
      if (!updated) return res.status(500).json({ message: "No se pudo actualizar la mascota" });

      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  deleteStudent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const deleted = await petRepository.delete(id);
      if (!deleted) return res.status(404).json({ message: "Mascota no encontrada o no eliminada" });

      return res.status(200).json(deleted);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  }
};

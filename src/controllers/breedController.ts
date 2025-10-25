import type { Request, Response } from "express";

import z from "zod";
import { breedRepository } from "../repositories/breedRepository";
import type { Breed } from "../entities/breedEntity";
import { BreedSchema } from "../entities/breedEntity";

export const breedController = {
  createBreed: async (req: Request, res: Response) => {
    try {
      const input = { ...req.body } as Record<string, unknown>;

      const parsed = BreedSchema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const breedData = parsed.data as Breed;
      const created = await breedRepository.create(breedData);
      if (!created) return res.status(500).json({ message: "No se pudo crear la raza" });

      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  readAllBreeds: async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const result = await breedRepository.readAll({ page, pageSize });
      if (result === null) return res.status(500).json({ message: "Error leyendo las razas" });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  readBreedById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const breed = await breedRepository.readById(id);
      if (!breed) return res.status(404).json({ message: "Raza no encontrada" });

      return res.status(200).json(breed);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  updateBreed: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const exists = await breedRepository.readById(id);
      if (!exists) return res.status(404).json({ message: "Raza no encontrada" });

      const input = { ...req.body } as Record<string, unknown>;
      const PartialBreedSchema = BreedSchema.partial();
      const parsed = PartialBreedSchema.safeParse(input);
      if (!parsed.success) {
        return res.status(400).json({ message: "Error en los datos", errors: z.treeifyError(parsed.error) });
      }

      const merged: Breed = { ...exists, ...parsed.data } as Breed;
      const updated = await breedRepository.update(id, merged);
      if (!updated) return res.status(500).json({ message: "No se pudo actualizar la raza" });

      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },

  deleteBreed: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

      const deleted = await breedRepository.delete(id);
      if (!deleted) return res.status(404).json({ message: "Raza no encontrada o no eliminada" });

      return res.status(200).json(deleted);
    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: String(err) });
    }
  },
};

import { Router } from "express";
import { petController } from "../controllers/petController";

const petRouter = Router();
const controller = petController;

petRouter.post('/', controller.createPet);
petRouter.get('/', controller.readAllPets);
petRouter.get('/:id', controller.readPetById);
petRouter.put('/', controller.updatePet);
petRouter.delete('/:id', controller.deletePet);

export { petRouter };

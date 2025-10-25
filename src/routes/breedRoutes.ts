import { Router } from "express";
import { breedController } from "../controllers/breedController";

const breedRouter = Router();
const controller = breedController;

breedRouter.post('/', controller.createBreed);
breedRouter.get('/', controller.readAllBreeds);
breedRouter.get('/:id', controller.readBreedById);
breedRouter.put('/', controller.updateBreed);
breedRouter.delete('/:id', controller.deleteBreed);

export { breedRouter };

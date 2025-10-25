import { Router } from "express";
import { ownerController } from "../controllers/ownerController";

const ownerRouter = Router();
const controller = ownerController;

ownerRouter.post('/', controller.createOwner);
ownerRouter.get('/', controller.readAllOwners);
ownerRouter.get('/:id', controller.readOwnerById);
ownerRouter.put('/', controller.updateOwner);
ownerRouter.delete('/:id', controller.deleteOwner);

export { ownerRouter };

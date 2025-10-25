import { Router } from "express";
import { petRouter } from "../routes/studentRoutes";
import { ownerRouter } from "../routes/ownerRoutes";
import { breedRouter } from "../routes/breedRoutes";

const router = Router();
router.use('/api/student', petRouter);
router.use('/api/owner', ownerRouter);
router.use('/api/student', breedRouter);

export { router };

import { Router } from "express";
import boardRoutes from "./board.routes.js";
import cardRoutes from "./card.routes.js";

const router = Router();

router.use("/boards", boardRoutes);
router.use("/cards", cardRoutes);

export default router;

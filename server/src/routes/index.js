import { Router } from "express";
import boardRoutes from "./board.routes.js";
import cardRoutes from "./card.routes.js";

const router = Router();

router.use("/boards", boardRoutes); // -> /api/boards...
router.use("/cards", cardRoutes); // -> /api/cards...

export default router;

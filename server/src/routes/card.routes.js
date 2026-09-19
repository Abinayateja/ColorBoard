import { Router } from "express";
import { getCards, addCard, removeCard } from "../controllers/card.controller.js";

const router = Router();

router.get("/", getCards); // ?boardId=xxxx
router.post("/", addCard);
router.delete("/:id", removeCard);

export default router;

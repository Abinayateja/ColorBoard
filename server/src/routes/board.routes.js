import { Router } from "express";
import {
  getBoards,
  getBoard,
  addBoard,
  removeBoard,
} from "../controllers/board.controller.js";

const router = Router();

router.get("/", getBoards);
router.get("/:id", getBoard);
router.post("/", addBoard);
router.delete("/:id", removeBoard);

export default router;

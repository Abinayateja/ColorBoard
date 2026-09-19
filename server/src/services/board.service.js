import Board from "../models/Board.model.js";
import Card from "../models/Card.model.js";

export const getAllBoards = async () => {
  return Board.find().sort({ createdAt: -1 });
};

export const getBoardById = async (id) => {
  const board = await Board.findById(id);
  if (!board) {
    const error = new Error("Board not found");
    error.statusCode = 404;
    throw error;
  }
  return board;
};

export const createBoard = async (title, description) => {
  const board = await Board.create({ title, description });
  return board;
};

export const deleteBoard = async (id) => {
  const board = await Board.findById(id);
  if (!board) {
    const error = new Error("Board not found");
    error.statusCode = 404;
    throw error;
  }
  await Card.deleteMany({ boardId: id });
  await board.deleteOne();
  return { id };
};

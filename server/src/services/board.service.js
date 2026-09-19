import Board from "../models/Board.model.js";
import Card from "../models/Card.model.js";

// All boards, newest first
export const getAllBoards = async () => {
  return Board.find().sort({ createdAt: -1 });
};

// A single board by id
export const getBoardById = async (id) => {
  const board = await Board.findById(id);
  if (!board) {
    const error = new Error("Board not found");
    error.statusCode = 404;
    throw error;
  }
  return board;
};

// Create a new board
export const createBoard = async (title, description) => {
  const board = await Board.create({ title, description });
  return board;
};

// Delete a board AND all of its cards (so we don't leave orphaned cards)
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

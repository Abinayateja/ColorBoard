import Card from "../models/Card.model.js";
import Board from "../models/Board.model.js";

// All cards belonging to one board, newest first
export const getCardsByBoard = async (boardId) => {
  return Card.find({ boardId }).sort({ createdAt: -1 });
};

// Create a new card on a board (checks the board exists first)
export const createCard = async (boardId, type, content) => {
  const board = await Board.findById(boardId);
  if (!board) {
    const error = new Error("Board not found");
    error.statusCode = 404;
    throw error;
  }

  const card = await Card.create({ boardId, type, content });
  return card;
};

// Delete a single card
export const deleteCard = async (id) => {
  const card = await Card.findById(id);
  if (!card) {
    const error = new Error("Card not found");
    error.statusCode = 404;
    throw error;
  }
  await card.deleteOne();
  return { id };
};

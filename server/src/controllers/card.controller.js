import * as cardService from "../services/card.service.js";
export const getCards = async (req, res, next) => {
  try {
    const { boardId } = req.query;

    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: "boardId query parameter is required.",
      });
    }

    const cards = await cardService.getCardsByBoard(boardId);
    return res.json({ success: true, data: cards });
  } catch (error) {
    next(error);
  }
};
export const addCard = async (req, res, next) => {
  try {
    const { boardId, type, content } = req.body;

    if (!boardId || !type || !content) {
      return res.status(400).json({
        success: false,
        message: "boardId, type, and content are required.",
      });
    }

    const validTypes = ["text", "image", "color"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `type must be one of: ${validTypes.join(", ")}`,
      });
    }

    const card = await cardService.createCard(boardId, type, content);
    return res.status(201).json({ success: true, data: card });
  } catch (error) {
    next(error);
  }
};

export const removeCard = async (req, res, next) => {
  try {
    const result = await cardService.deleteCard(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

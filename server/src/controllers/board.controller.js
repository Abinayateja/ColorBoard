import * as boardService from "../services/board.service.js";
export const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getAllBoards();
    return res.json({ success: true, data: boards });
  } catch (error) {
    next(error);
  }
};
export const getBoard = async (req, res, next) => {
  try {
    const board = await boardService.getBoardById(req.params.id);
    return res.json({ success: true, data: board });
  } catch (error) {
    next(error);
  }
};

export const addBoard = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Board title is required.",
      });
    }

    const board = await boardService.createBoard(title.trim(), description);
    return res.status(201).json({ success: true, data: board });
  } catch (error) {
    next(error);
  }
};

export const removeBoard = async (req, res, next) => {
  try {
    const result = await boardService.deleteBoard(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

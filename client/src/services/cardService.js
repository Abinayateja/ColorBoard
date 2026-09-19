import API from "./api.js";

export const fetchCardsByBoard = async (boardId) => {
  const response = await API.get(`/cards?boardId=${boardId}`);
  return response.data.data;
};

export const createCard = async (boardId, type, content) => {
  const response = await API.post("/cards", { boardId, type, content });
  return response.data.data;
};

export const deleteCard = async (id) => {
  await API.delete(`/cards/${id}`);
  return id;
};

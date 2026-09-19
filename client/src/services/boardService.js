import API from "./api.js";


export const fetchBoards = async () => {
  const response = await API.get("/boards");
  return response.data.data;
};

export const createBoard = async (title, description) => {
  const response = await API.post("/boards", { title, description });
  return response.data.data;
};

export const deleteBoard = async (id) => {
  await API.delete(`/boards/${id}`);
  return id;
};

import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./slices/boardsSlice.js";
import cardsReducer from "./slices/cardsSlice.js";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
  },
});

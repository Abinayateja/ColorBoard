import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cardService from "../../services/cardService.js";

export const getCardsByBoard = createAsyncThunk(
  "cards/getCardsByBoard",
  async (boardId, { rejectWithValue }) => {
    try {
      const cards = await cardService.fetchCardsByBoard(boardId);
      return cards;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cards"
      );
    }
  }
);
export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ boardId, type, content }, { rejectWithValue }) => {
    try {
      return await cardService.createCard(boardId, type, content);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add card"
      );
    }
  }
);

export const removeCard = createAsyncThunk(
  "cards/removeCard",
  async (id, { rejectWithValue }) => {
    try {
      await cardService.deleteCard(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete card"
      );
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCards: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsByBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardsByBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCardsByBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      })
      .addCase(removeCard.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCards } = cardsSlice.actions;
export const selectAllCards = (state) => state.cards.items;
export const selectCardsLoading = (state) => state.cards.loading;
export const selectCardsError = (state) => state.cards.error;

export default cardsSlice.reducer;

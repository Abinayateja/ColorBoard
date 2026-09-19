import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as boardService from "../../services/boardService.js";


export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (_, { rejectWithValue }) => {
    try {
      return await boardService.fetchBoards();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load boards"
      );
    }
  }
);

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      return await boardService.createBoard(title, description);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create board"
      );
    }
  }
);

export const removeBoard = createAsyncThunk(
  "boards/removeBoard",
  async (id, { rejectWithValue }) => {
    try {
      await boardService.deleteBoard(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete board"
      );
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    items: [], 
    selectedBoardId: null,
    searchTerm: "",
    loading: false,
    error: null,
  },

  reducers: {
    selectBoard: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    clearSelectedBoard: (state) => {
      state.selectedBoardId = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); 
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
        if (state.selectedBoardId === action.payload) {
          state.selectedBoardId = null;
        }
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { selectBoard, clearSelectedBoard, setSearchTerm } =
  boardsSlice.actions;
export const selectAllBoards = (state) => state.boards.items;
export const selectBoardsLoading = (state) => state.boards.loading;
export const selectBoardsError = (state) => state.boards.error;
export const selectSelectedBoardId = (state) => state.boards.selectedBoardId;
export const selectSearchTerm = (state) => state.boards.searchTerm;

export const selectFilteredBoards = (state) => {
  const term = state.boards.searchTerm.trim().toLowerCase();
  if (!term) return state.boards.items;
  return state.boards.items.filter((b) =>
    b.title.toLowerCase().includes(term)
  );
};

export default boardsSlice.reducer;

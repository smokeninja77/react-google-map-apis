import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface HistoryState {
  historySearch: { name: string }[];
}

const initialState: HistoryState = {
  historySearch: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<{ name: string }>) => {
      state.historySearch.push(action.payload);
    },
    clearHistory: (state) => {
      state.historySearch = [];
    },
  },
});

export const { addSearch, clearHistory } = historySlice.actions;

const persistConfig = {
  key: "history",
  storage,
};

export const persistedHistoryReducer = persistReducer(persistConfig, historySlice.reducer);

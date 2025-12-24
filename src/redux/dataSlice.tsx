import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FormItem } from "../components/DataTable";

type DataState = { items: FormItem[] };

const initialState: DataState = {
  items: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<FormItem[]>) {
      state.items = action.payload;
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addItem(state, action: PayloadAction<FormItem>) {
      const exists = state.items.some(
        (existing) => existing.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    updateItem(state, action: PayloadAction<FormItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setData, deleteItem, addItem, updateItem } = dataSlice.actions;
export default dataSlice.reducer;

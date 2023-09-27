import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    add: (state, action) => {
      state.order.push({ ...action.payload });
    },

    orderclear: (state, action) => {
      state.order = [];
    },
  },
});

export const { add, orderclear } = orderSlice.actions;
export default orderSlice.reducer;

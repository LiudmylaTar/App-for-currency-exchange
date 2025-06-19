import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    text: '',
  },
  reducers: {
    changeCurrencyFilter(state, action) {
      state.text = action.payload;
    },
  },
});
export const { changeCurrencyFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeCurrency,
  fetchRates,
} from './operation';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchExchangeCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchRates.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.exchangeInfo = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.baseCurrency = action.payload.baseCurrency;
        state.rates = action.payload.rates;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        console.log('Rates fetch failed:', action.payload);
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;

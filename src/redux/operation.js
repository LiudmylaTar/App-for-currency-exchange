import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, getUserInfo, latestRates } from '../service';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/baseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;
    if (baseCurrency) {
      return baseCurrency;
    }

    try {
      const rest = await getUserInfo(coords);
      return rest.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeCurrency = createAsyncThunk(
  'currency/exchangeCurrency',
  async (currency, thunkAPI) => {
    try {
      const rest = await exchangeCurrency(currency);
      console.log(rest);
      return rest;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async (baseCurrency, thunkAPI) => {
    try {
      console.log('➡️ fetchRates start:', baseCurrency);
      const rates = await latestRates(baseCurrency);
      console.log('✅ fetchRates success:', rates);
      return { baseCurrency, rates };
    } catch (error) {
      console.log('❌ fetchRates error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

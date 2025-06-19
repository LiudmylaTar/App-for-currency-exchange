import { createSelector } from '@reduxjs/toolkit';

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExechangeInfo = state => state.currency.exchangeInfo;
export const selectIsLoading = state => state.currency.isLoading;
export const selectRates = state => state.currency.rates;
export const selectCurrencyFilter = state => state.filters.text;

export const selectFilteredRates = createSelector(
  [selectRates, selectBaseCurrency, selectCurrencyFilter],
  (rates, baseCurrency, filter) => {
    return rates
      .filter(
        ([key]) => key !== baseCurrency && key.toLowerCase().includes(filter),
      )
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);

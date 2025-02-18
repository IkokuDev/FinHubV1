import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  portfolios: [],
  isLoading: false,
  error: null,
};

const investmentsSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {
    fetchPortfoliosStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPortfoliosSuccess: (state, action) => {
      state.isLoading = false;
      state.portfolios = action.payload;
    },
    fetchPortfoliosFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPortfoliosStart,
  fetchPortfoliosSuccess,
  fetchPortfoliosFailure,
} = investmentsSlice.actions;

export default investmentsSlice.reducer; 
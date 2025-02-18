import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  policies: [],
  isLoading: false,
  error: null,
};

const insuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    fetchPoliciesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPoliciesSuccess: (state, action) => {
      state.isLoading = false;
      state.policies = action.payload;
    },
    fetchPoliciesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPoliciesStart,
  fetchPoliciesSuccess,
  fetchPoliciesFailure,
} = insuranceSlice.actions;

export default insuranceSlice.reducer; 
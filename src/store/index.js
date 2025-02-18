import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import paymentsReducer from '../features/payments/paymentsSlice';
import insuranceReducer from '../features/insurance/insuranceSlice';
import investmentsReducer from '../features/investments/investmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentsReducer,
    insurance: insuranceReducer,
    investments: investmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 
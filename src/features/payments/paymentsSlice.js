import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  balance: 0,
  filters: {
    type: 'all', // all, credit, debit
    dateRange: 'all', // all, week, month, year
    category: 'all',
  },
  sortBy: {
    field: 'date',
    order: 'desc',
  },
  categories: [
    'Salary',
    'Bills',
    'Food',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Investment',
    'Others'
  ],
  isLoading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    fetchTransactionsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
      // Calculate balance
      state.balance = action.payload.reduce((acc, curr) => {
        return curr.type === 'credit' 
          ? acc + curr.amount 
          : acc - curr.amount;
      }, 0);
    },
    fetchTransactionsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTransactionStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addTransactionSuccess: (state, action) => {
      state.isLoading = false;
      state.transactions.unshift(action.payload);
      // Update balance
      state.balance = action.payload.type === 'credit'
        ? state.balance + action.payload.amount
        : state.balance - action.payload.amount;
    },
    addTransactionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  addTransactionStart,
  addTransactionSuccess,
  addTransactionFailure,
  updateFilters,
  updateSort,
} = paymentsSlice.actions;

// Selectors
export const selectFilteredTransactions = (state) => {
  const { transactions, filters, sortBy } = state.payments;
  
  let filtered = [...transactions];

  // Apply filters
  if (filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  if (filters.category !== 'all') {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  if (filters.dateRange !== 'all') {
    const now = new Date();
    const ranges = {
      week: new Date(now.setDate(now.getDate() - 7)),
      month: new Date(now.setMonth(now.getMonth() - 1)),
      year: new Date(now.setFullYear(now.getFullYear() - 1)),
    };
    filtered = filtered.filter(t => new Date(t.date) >= ranges[filters.dateRange]);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];
    const order = sortBy.order === 'asc' ? 1 : -1;

    if (sortBy.field === 'date') {
      return (new Date(aValue) - new Date(bValue)) * order;
    }
    return (aValue - bValue) * order;
  });

  return filtered;
};

export default paymentsSlice.reducer; 
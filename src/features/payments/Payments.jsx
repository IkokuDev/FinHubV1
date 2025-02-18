import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  updateFilters,
  updateSort,
  selectFilteredTransactions,
} from './paymentsSlice';
import AddTransaction from './AddTransaction';
import TransactionStats from './TransactionStats';

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-medium rounded-md ${
      active
        ? 'bg-primary-100 text-primary-700'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {children}
  </button>
);

const Payments = () => {
  const dispatch = useDispatch();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');
  const { isLoading, error, balance, filters, sortBy, categories } = useSelector(
    (state) => state.payments
  );
  const transactions = useSelector(selectFilteredTransactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      dispatch(fetchTransactionsStart());
      try {
        // TODO: Replace with actual API call
        const response = await mockTransactionsAPI();
        dispatch(fetchTransactionsSuccess(response));
      } catch (error) {
        dispatch(fetchTransactionsFailure(error.message));
      }
    };

    fetchTransactions();
  }, [dispatch]);

  // Mock API call
  const mockTransactionsAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: 'credit',
            amount: 50000,
            description: 'Salary',
            category: 'Salary',
            date: '2024-02-15',
          },
          {
            id: 2,
            type: 'debit',
            amount: 15000,
            description: 'Rent',
            category: 'Bills',
            date: '2024-02-14',
          },
          {
            id: 3,
            type: 'debit',
            amount: 5000,
            description: 'Utilities',
            category: 'Bills',
            date: '2024-02-13',
          },
        ]);
      }, 1000);
    });
  };

  const handleFilterChange = (type, value) => {
    dispatch(updateFilters({ [type]: value }));
  };

  const handleSortChange = (field) => {
    dispatch(
      updateSort({
        field,
        order: sortBy.field === field && sortBy.order === 'desc' ? 'asc' : 'desc',
      })
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with balance */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your transactions and payments
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-3xl font-bold text-gray-900">
              ₦{balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`${
                activeTab === 'statistics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Statistics
            </button>
          </nav>
        </div>

        {activeTab === 'transactions' ? (
          <>
            {/* Filters and Actions */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex space-x-4">
                  <FilterButton
                    active={filters.type === 'all'}
                    onClick={() => handleFilterChange('type', 'all')}
                  >
                    All
                  </FilterButton>
                  <FilterButton
                    active={filters.type === 'credit'}
                    onClick={() => handleFilterChange('type', 'credit')}
                  >
                    Income
                  </FilterButton>
                  <FilterButton
                    active={filters.type === 'debit'}
                    onClick={() => handleFilterChange('type', 'debit')}
                  >
                    Expenses
                  </FilterButton>
                </div>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Add Transaction
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>

                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transactions List */}
            {isLoading ? (
              <div>Loading transactions...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <li key={transaction.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              {transaction.category}
                            </span>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.type === 'credit'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {transaction.type === 'credit' ? '+' : '-'}₦
                              {transaction.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {transaction.type.charAt(0).toUpperCase() +
                                transaction.type.slice(1)}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <TransactionStats transactions={transactions} />
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowAddTransaction(false)}
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <AddTransaction onClose={() => setShowAddTransaction(false)} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payments; 
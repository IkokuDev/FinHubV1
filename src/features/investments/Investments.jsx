import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchPortfoliosStart, fetchPortfoliosSuccess, fetchPortfoliosFailure } from './investmentsSlice';

const Investments = () => {
  const dispatch = useDispatch();
  const { portfolios, isLoading, error } = useSelector((state) => state.investments);

  useEffect(() => {
    const fetchPortfolios = async () => {
      dispatch(fetchPortfoliosStart());
      try {
        // TODO: Replace with actual API call
        const response = await mockPortfoliosAPI();
        dispatch(fetchPortfoliosSuccess(response));
      } catch (error) {
        dispatch(fetchPortfoliosFailure(error.message));
      }
    };

    fetchPortfolios();
  }, [dispatch]);

  // Mock API call
  const mockPortfoliosAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Growth Portfolio',
            type: 'Stocks',
            value: 1500000,
            returns: 12.5,
            risk: 'High',
            lastUpdated: '2024-02-15',
          },
          {
            id: 2,
            name: 'Fixed Income',
            type: 'Bonds',
            value: 2000000,
            returns: 8.2,
            risk: 'Low',
            lastUpdated: '2024-02-15',
          },
          {
            id: 3,
            name: 'Real Estate Fund',
            type: 'REIT',
            value: 3000000,
            returns: 10.1,
            risk: 'Medium',
            lastUpdated: '2024-02-15',
          },
        ]);
      }, 1000);
    });
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investments</h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage your investment portfolios
          </p>
        </div>

        {isLoading ? (
          <div>Loading portfolios...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {portfolio.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {portfolio.type}
                      </p>
                    </div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(
                        portfolio.risk
                      )}`}
                    >
                      {portfolio.risk} Risk
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Value
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                          ₦{portfolio.value.toLocaleString()}
                        </dd>
                      </div>
                      <div className="text-right">
                        <dt className="text-sm font-medium text-gray-500">
                          Returns
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-green-600">
                          {portfolio.returns}%
                        </dd>
                      </div>
                    </div>
                    <div className="mt-4">
                      <dt className="text-xs text-gray-500">Last Updated</dt>
                      <dd className="text-xs text-gray-500">
                        {new Date(portfolio.lastUpdated).toLocaleDateString()}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Investments; 
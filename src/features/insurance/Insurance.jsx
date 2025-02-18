import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchPoliciesStart, fetchPoliciesSuccess, fetchPoliciesFailure } from './insuranceSlice';

const Insurance = () => {
  const dispatch = useDispatch();
  const { policies, isLoading, error } = useSelector((state) => state.insurance);

  useEffect(() => {
    const fetchPolicies = async () => {
      dispatch(fetchPoliciesStart());
      try {
        // TODO: Replace with actual API call
        const response = await mockPoliciesAPI();
        dispatch(fetchPoliciesSuccess(response));
      } catch (error) {
        dispatch(fetchPoliciesFailure(error.message));
      }
    };

    fetchPolicies();
  }, [dispatch]);

  // Mock API call
  const mockPoliciesAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: 'Health',
            provider: 'AXA Mansard',
            status: 'Active',
            premium: 250000,
            coverage: 5000000,
            expiryDate: '2025-02-15',
          },
          {
            id: 2,
            type: 'Vehicle',
            provider: 'Leadway Assurance',
            status: 'Active',
            premium: 100000,
            coverage: 2000000,
            expiryDate: '2025-01-20',
          },
          {
            id: 3,
            type: 'Life',
            provider: 'AIICO Insurance',
            status: 'Active',
            premium: 150000,
            coverage: 10000000,
            expiryDate: '2025-03-10',
          },
        ]);
      }, 1000);
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Insurance</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your insurance policies
          </p>
        </div>

        {isLoading ? (
          <div>Loading policies...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {policies.map((policy) => (
                <li key={policy.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {policy.type} Insurance
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Provider: {policy.provider}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {policy.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 sm:flex sm:justify-between">
                    <div className="sm:flex sm:space-x-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Premium
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          ₦{policy.premium.toLocaleString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Coverage
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          ₦{policy.coverage.toLocaleString()}
                        </dd>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <dt className="text-sm font-medium text-gray-500">
                        Expires
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(policy.expiryDate).toLocaleDateString()}
                      </dd>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Insurance; 
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';

const OverviewCard = ({ title, value, description }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const overviewData = [
    {
      title: 'Total Balance',
      value: '₦2,500,000',
      description: 'Available funds across all accounts',
    },
    {
      title: 'Active Investments',
      value: '5',
      description: 'Currently active investment portfolios',
    },
    {
      title: 'Insurance Policies',
      value: '3',
      description: 'Active insurance policies',
    },
    {
      title: 'Recent Transactions',
      value: '12',
      description: 'Transactions in the last 30 days',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your financial status
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {overviewData.map((item, index) => (
            <OverviewCard key={index} {...item} />
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {/* Placeholder for recent activity list */}
            <p className="text-sm text-gray-500">No recent activity to display</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 
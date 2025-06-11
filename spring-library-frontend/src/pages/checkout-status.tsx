import { useNavigate, useSearchParams } from 'react-router';

const CheckoutStatus = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const navigate = useNavigate();

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Checkout Successful!</h1>
        <p className="text-lg">Thank you for your purchase.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (status === 'cancel') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Checkout Cancelled</h1>
        <p className="text-lg">Your purchase was not completed.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }
};

export default CheckoutStatus;

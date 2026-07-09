import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully.
        </p>

        <Link
          to="/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          View Orders
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;
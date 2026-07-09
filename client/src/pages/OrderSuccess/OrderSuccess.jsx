import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {

    return (

        <div className="min-h-[80vh] flex items-center justify-center px-5">

            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center">

                <FaCheckCircle
                    className="mx-auto text-green-600 mb-6"
                    size={80}
                />

                <h1 className="text-4xl font-bold">

                    Payment Successful

                </h1>

                <p className="text-gray-600 mt-5">

                    Thank you for shopping with ShopSphere.

                </p>

                <p className="text-gray-500 mt-2">

                    Your order has been placed successfully.

                </p>

                <div className="mt-8 space-y-4">

                    <Link
                        to="/my-orders"
                        className="block bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >

                        View My Orders

                    </Link>

                    <Link
                        to="/"
                        className="block border border-gray-300 hover:bg-gray-100 py-3 rounded-lg"
                    >

                        Continue Shopping

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default OrderSuccess;
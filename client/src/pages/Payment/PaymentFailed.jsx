import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {

    return (

        <div className="min-h-[80vh] flex items-center justify-center px-5">

            <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center">

                <FaTimesCircle
                    className="mx-auto text-red-600 mb-6"
                    size={80}
                />

                <h1 className="text-4xl font-bold">

                    Payment Failed

                </h1>

                <p className="text-gray-600 mt-5">

                    Unfortunately your payment could not be completed.

                </p>

                <p className="text-gray-500 mt-2">

                    Please try again.

                </p>

                <div className="mt-8 space-y-4">

                    <Link
                        to="/payment"
                        className="block bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                    >

                        Try Again

                    </Link>

                    <Link
                        to="/cart"
                        className="block border border-gray-300 hover:bg-gray-100 py-3 rounded-lg"
                    >

                        Back To Cart

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default PaymentFailed;
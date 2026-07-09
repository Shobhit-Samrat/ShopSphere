import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMyOrders } from "../../features/order/orderThunk";

const Orders = () => {

    const dispatch = useDispatch();

    const {
        myOrders,
        loading,
        error
    } = useSelector(
        state => state.order
    );

    useEffect(() => {

        dispatch(fetchMyOrders());

    }, [dispatch]);

    if (loading) {

        return (
            <div className="text-center py-10">
                Loading orders...
            </div>
        );

    }

    if (error) {

        return (
            <div className="text-center text-red-600 py-10">
                {error}
            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold mb-8">

                My Orders

            </h1>

            {myOrders.length === 0 ? (

                <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                    <h2 className="text-2xl font-semibold">

                        No Orders Found

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Start shopping to place your first order.

                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">Order ID</th>

                                <th className="p-4 text-left">Date</th>

                                <th className="p-4 text-left">Total</th>

                                <th className="p-4 text-left">Status</th>

                                <th className="p-4 text-left">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {myOrders.map(order => (

                                <tr
                                    key={order._id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {order._id.slice(-8)}

                                    </td>

                                    <td className="p-4">

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4">

                                        ₹{order.totalPrice}

                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                order.orderStatus === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >

                                            {order.orderStatus}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="text-blue-600 hover:underline"
                                        >

                                            View

                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

};

export default Orders;
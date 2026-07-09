import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { fetchOrderById } from "../../features/order/orderThunk";

const OrderDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {

        order,

        loading,

        error,

    } = useSelector(
        state => state.order
    );

    useEffect(() => {

        dispatch(fetchOrderById(id));

    }, [dispatch, id]);

    if (loading) {

        return (

            <div className="text-center py-20">

                Loading...

            </div>

        );

    }

    if (error) {

        return (

            <div className="text-center py-20 text-red-600">

                {error}

            </div>

        );

    }

    if (!order) {

        return (

            <div className="text-center py-20">

                Order not found.

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold mb-8">

                Order Details

            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">

                    <h2 className="text-2xl font-bold mb-5">

                        Products

                    </h2>

                    {

                        order.orderItems.map(item => (

                            <div

                                key={item.product}

                                className="flex gap-5 border-b py-5"

                            >

                                <img

                                    src={item.image}

                                    alt={item.name}

                                    className="w-24 h-24 object-cover rounded"

                                />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        {item.name}

                                    </h3>

                                    <p>

                                        Qty : {item.quantity}

                                    </p>

                                    <p>

                                        ₹{item.price}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

                <div>

                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Order Summary

                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">

                                <span>Items</span>

                                <span>

                                    ₹{order.itemsPrice}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Shipping</span>

                                <span>

                                    ₹{order.shippingPrice}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Tax</span>

                                <span>

                                    ₹{order.taxPrice}

                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between font-bold text-xl">

                                <span>Total</span>

                                <span>

                                    ₹{order.totalPrice}

                                </span>

                            </div>

                            <hr />

                            <p>

                                <strong>

                                    Payment Method :

                                </strong>

                                {" "}

                                {order.paymentMethod}

                            </p>

                            <p>

                                <strong>

                                    Payment Status :

                                </strong>

                                {" "}

                                {order.paymentStatus}

                            </p>

                            <p>

                                <strong>

                                    Order Status :

                                </strong>

                                {" "}

                                {order.orderStatus}

                            </p>

                        </div>

                    </div>

                    <div className="bg-white shadow rounded-xl p-6 mt-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Shipping Address

                        </h2>

                        <p>

                            {order.shippingAddress.address}

                        </p>

                        <p>

                            {order.shippingAddress.city}

                        </p>

                        <p>

                            {order.shippingAddress.state}

                        </p>

                        <p>

                            {order.shippingAddress.country}

                        </p>

                        <p>

                            {order.shippingAddress.postalCode}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default OrderDetails;
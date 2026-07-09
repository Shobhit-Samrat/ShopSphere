import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../../features/order/orderThunk";
import { clearCart } from "../../features/cart/cartSlice";

import {
    fetchRazorpayKey,
    createPaymentOrder,
    verifyPayment,
} from "../../features/payment/paymentThunk";

import loadRazorpay from "../../utils/loadRazorpay";

const PaymentCard = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { cart } = useSelector(
        (state) => state.cart
    );

    const { shippingAddress } = useSelector(
        (state) => state.order
    );

    const { loading } = useSelector(
        (state) => state.payment
    );

    const subtotal = cart?.totalPrice || 0;

    const shipping = subtotal > 1000 ? 0 : 100;

    const tax = Math.round(subtotal * 0.18);

    const total =
        subtotal +
        shipping +
        tax;

    const paymentHandler = async () => {

        // Load Razorpay SDK

        const sdkLoaded =
            await loadRazorpay();

        if (!sdkLoaded) {

            alert(
                "Failed to load Razorpay SDK."
            );

            return;

        }

        // Create MongoDB Order

        const orderData = {

            address:
                shippingAddress.address,

            city:
                shippingAddress.city,

            state:
                shippingAddress.state,

            country:
                shippingAddress.country,

            postalCode:
                shippingAddress.pincode,

            paymentMethod:
                "Razorpay",

        };

        const orderResult =
            await dispatch(
                placeOrder(orderData)
            );

        if (
            !placeOrder.fulfilled.match(orderResult)
        ) {

            alert("Order creation failed");

            return;

        }

        const mongoOrder =
            orderResult.payload.order;

        // Fetch Razorpay Key

        const keyResult =
            await dispatch(
                fetchRazorpayKey()
            );

        if (
            !fetchRazorpayKey.fulfilled.match(keyResult)
        ) {

            alert("Unable to fetch Razorpay Key");

            return;

        }

        const razorpayKey =
            keyResult.payload.key;

        // Create Razorpay Order

        const razorpayResult =
            await dispatch(
                createPaymentOrder({

                    amount: total,

                    orderId: mongoOrder._id,

                })
            );

        if (
            !createPaymentOrder.fulfilled.match(
                razorpayResult
            )
        ) {

            alert("Unable to create payment");

            return;

        }

        const razorpayOrder =
            razorpayResult.payload.order;

        const options = {

            key: razorpayKey,

            amount:
                razorpayOrder.amount,

            currency:
                razorpayOrder.currency,

            name: "ShopSphere",

            description:
                "Order Payment",

            order_id:
                razorpayOrder.id,

            handler: async function (response) {

                const verifyResult =
                    await dispatch(
                        verifyPayment({

                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature,

                            orderId:
                                mongoOrder._id,

                        })
                    );

                if (
                           verifyPayment.fulfilled.match(
                        verifyResult
                        )
                    ) {

                    dispatch(clearCart());

                    navigate("/order-success");

                    }

                else {

                    navigate("/payment-failed");

                }

            },

            prefill: {

                name:
                    shippingAddress.fullName,

                email:
                    shippingAddress.email,

                contact:
                    shippingAddress.phone,

            },

            theme: {

                color: "#2563EB",

            },

        };

        const paymentObject =
            new window.Razorpay(options);

        paymentObject.open();

    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">

                Payment Summary

            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>

                        ₹{subtotal}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>

                        {

                            shipping === 0

                                ? "FREE"

                                : `₹${shipping}`

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>GST (18%)</span>

                    <span>

                        ₹{tax}

                    </span>

                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>

                        Total

                    </span>

                    <span>

                        ₹{total}

                    </span>

                </div>

            </div>

            <button

                onClick={paymentHandler}

                disabled={loading}

                className={`

                    w-full

                    mt-8

                    py-3

                    rounded-lg

                    text-white

                    font-semibold

                    transition

                    ${

                        loading

                            ? "bg-gray-400 cursor-not-allowed"

                            : "bg-green-600 hover:bg-green-700"

                    }

                `}

            >

                {

                    loading

                        ? "Processing Payment..."

                        : `Pay ₹${total}`

                }

            </button>

        </div>

    );

};

export default PaymentCard;
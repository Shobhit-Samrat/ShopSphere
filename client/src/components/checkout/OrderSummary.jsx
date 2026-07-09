import { useNavigate } from "react-router-dom";

const OrderSummary = ({ cart }) => {

    const navigate = useNavigate();

    const cartItems = cart?.cartItems || [];

    const subtotal = cart?.totalPrice || 0;

    const shipping = subtotal >= 500 ? 0 : 40;

    const gst = Math.round(subtotal * 0.18);

    const total = subtotal + shipping + gst;

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">

                Order Summary

            </h2>

            <div className="space-y-5">

                {cartItems.map((item) => (

                    <div
                        key={item.product._id}
                        className="flex gap-4 border-b pb-4"
                    >

                        <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold">

                                {item.product.name}

                            </h3>

                            <p className="text-gray-500">

                                Qty : {item.quantity}

                            </p>

                            <p className="font-bold">

                                ₹{item.product.price}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

            <div className="mt-8 space-y-3">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>₹{subtotal}</span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>

                        {shipping === 0

                            ? "FREE"

                            : `₹${shipping}`}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>GST (18%)</span>

                    <span>₹{gst}</span>

                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span>

                        ₹{total}

                    </span>

                </div>

            </div>

            <button

                onClick={() => navigate("/payment")}

                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"

            >

                Proceed To Payment

            </button>

        </div>

    );

};

export default OrderSummary;
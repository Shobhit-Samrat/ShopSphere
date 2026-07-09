import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { saveShippingAddress } from "../../features/order/orderSlice";
import { placeOrder } from "../../features/order/orderThunk";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Correct Redux state
    const { cart } = useSelector((state) => state.cart);

    const { loading } = useSelector((state) => state.order);

    const cartItems = cart?.cartItems || [];

    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Use backend total if available
    const totalPrice = cart?.totalPrice || 0;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        dispatch(saveShippingAddress(formData));

        const orderData = {
            orderItems: cartItems.map((item) => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                image: item.product.images?.[0] || "",
            })),

            shippingAddress: formData,

            itemsPrice: cart?.itemsPrice || totalPrice,

            taxPrice: cart?.taxPrice || 0,

            shippingPrice: cart?.shippingPrice || 0,

            totalPrice,
        };

        const result = await dispatch(placeOrder(orderData));

        if (placeOrder.fulfilled.match(result)) {
            toast.success("Order Created Successfully");

            navigate(`/payment/${result.payload.order._id}`);
        } else {
            toast.error(result.payload || "Failed to create order");
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-5">

            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <form
                onSubmit={submitHandler}
                className="grid gap-5"
            >

                <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <div className="bg-gray-100 rounded-lg p-5">

                    <h2 className="text-xl font-bold mb-4">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-2">
                        <span>Total Items</span>
                        <span>{cartItems.length}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>Items Price</span>
                        <span>₹{cart?.itemsPrice || totalPrice}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>₹{cart?.taxPrice || 0}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>₹{cart?.shippingPrice || 0}</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-2xl font-bold">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-gray-400"
                >
                    {loading ? "Processing..." : "Continue To Payment"}
                </button>

            </form>

        </div>
    );
};

export default Checkout;
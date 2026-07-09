import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    fetchCart,
    updateCartQuantity,
    removeCartItem,
} from "../../features/cart/cartThunk";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        cart,
        loading,
        error,
    } = useSelector((state) => state.cart);

    useEffect(() => {

        dispatch(fetchCart());

    }, [dispatch]);

    // ==========================
    // Increase Quantity
    // ==========================

    const increaseQuantity = (productId, quantity) => {

        dispatch(

            updateCartQuantity({

                productId,

                quantity: quantity + 1,

            })

        );

    };

    // ==========================
    // Decrease Quantity
    // ==========================

    const decreaseQuantity = (productId, quantity) => {

        if (quantity <= 1) return;

        dispatch(

            updateCartQuantity({

                productId,

                quantity: quantity - 1,

            })

        );

    };

    // ==========================
    // Remove Item
    // ==========================

    const removeHandler = (productId) => {

        dispatch(removeCartItem(productId));

        toast.success("Item removed from cart");

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[60vh]">

                <h2 className="text-3xl font-bold">

                    Loading Cart...

                </h2>

            </div>

        );

    }

    // ==========================
    // Error
    // ==========================

    if (error) {

        return (

            <div className="text-center mt-20 text-red-600 text-xl">

                {error}

            </div>

        );

    }

    // ==========================
    // Empty Cart
    // ==========================

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {

        return (

            <div className="text-center mt-24">

                <h2 className="text-4xl font-bold mb-6">

                    Your Cart is Empty

                </h2>

                <Link
                    to="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                >
                    Continue Shopping
                </Link>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold mb-10">

                Shopping Cart

            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Cart Items */}

                <div className="lg:col-span-2 space-y-5">

                    {
    cart.cartItems
        .filter((item) => item.product)
        .map((item, index) => (

            <div
                key={`${item.product?._id || index}`}
                className="
                flex
                flex-col
                md:flex-row
                gap-6
                bg-white
                rounded-xl
                shadow
                border
                p-5
                items-center
                "
            >

                {/* Product Image */}

                <img

                    src={
                        item.product?.images?.[0] ||
                        "https://via.placeholder.com/300?text=No+Image"
                    }

                    alt={
                        item.product?.name || "Product"
                    }

                    className="
                    w-36
                    h-36
                    rounded-lg
                    object-cover
                    border
                    "

                />

                {/* Product Details */}

                <div className="flex-1 w-full">

                    <Link

                        to={`/product/${item.product?._id}`}

                        className="
                        text-xl
                        font-bold
                        hover:text-blue-600
                        transition
                        "

                    >

                        {item.product?.name}

                    </Link>

                    <p className="text-gray-500 mt-2">

                        Brand:
                        <span className="font-semibold ml-2">

                            {item.product?.brand || "ShopSphere"}

                        </span>

                    </p>

                    <p className="text-blue-600 text-2xl font-bold mt-3">

                        ₹{item.product?.price}

                    </p>

                    {/* Quantity Controls */}

                    <div className="flex items-center gap-4 mt-5">

                        <button

                            onClick={() =>
                                decreaseQuantity(
                                    item.product?._id,
                                    item.quantity
                                )
                            }

                            className="
                            w-10
                            h-10
                            rounded-lg
                            bg-gray-200
                            hover:bg-gray-300
                            text-xl
                            "
                        >

                            −

                        </button>

                        <span className="font-bold text-lg">

                            {item.quantity}

                        </span>

                        <button

                            onClick={() =>
                                increaseQuantity(
                                    item.product?._id,
                                    item.quantity
                                )
                            }

                            className="
                            w-10
                            h-10
                            rounded-lg
                            bg-gray-200
                            hover:bg-gray-300
                            text-xl
                            "
                        >

                            +

                        </button>

                    </div>

                </div>

                {/* Total + Remove */}

                <div className="text-center">

                    <p className="text-xl font-bold mb-4">

                        ₹
                        {
                            (item.product?.price || 0) *
                            item.quantity
                        }

                    </p>

                    <button

                        onClick={() =>
                            removeHandler(
                                item.product?._id
                            )
                        }

                        className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        transition
                        "

                    >

                        Remove

                    </button>

                </div>

            </div>

        ))
}

                </div>

                {/* ==========================
                    ORDER SUMMARY
                ========================== */}

                <div
                    className="
                    bg-white
                    rounded-xl
                    shadow-lg
                    p-6
                    h-fit
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        Order Summary

                    </h2>

                    {/* Total Items */}

                    <div className="flex justify-between mb-4">

                        <span>Total Items</span>

                        <span className="font-semibold">

                            {

                                cart.cartItems
                                    .filter(item => item.product)
                                    .reduce(

                                        (acc, item) =>

                                            acc + item.quantity,

                                        0

                                    )

                            }

                        </span>

                    </div>

                    {/* Subtotal */}

                    <div className="flex justify-between mb-4">

                        <span>Subtotal</span>

                        <span className="font-semibold">

                            ₹{

                                cart.cartItems
                                    .filter(item => item.product)
                                    .reduce(

                                        (acc, item) =>

                                            acc +

                                            (item.product.price * item.quantity),

                                        0

                                    )

                            }

                        </span>

                    </div>

                    {/* Tax */}

                    <div className="flex justify-between mb-4">

                        <span>Tax</span>

                        <span>

                            ₹{cart.taxPrice || 0}

                        </span>

                    </div>

                    {/* Shipping */}

                    <div className="flex justify-between mb-5">

                        <span>Shipping</span>

                        <span className="text-green-600 font-semibold">

                            Free

                        </span>

                    </div>

                    <hr className="mb-5" />

                    {/* Grand Total */}

                    <div className="flex justify-between text-2xl font-bold">

                        <span>Total</span>

                        <span className="text-blue-600">

                            ₹{

                                cart.cartItems
                                    .filter(item => item.product)
                                    .reduce(

                                        (acc, item) =>

                                            acc +

                                            (item.product.price * item.quantity),

                                        0

                                    ) +

                                (cart.taxPrice || 0)

                            }

                        </span>

                    </div>

                    <button

                        onClick={() => {

                            const token =
                                localStorage.getItem("token");

                            if (!token) {

                                toast.error(

                                    "Please login first"

                                );

                                navigate("/login");

                                return;

                            }

                            navigate("/checkout");

                        }}

                        className="
                        w-full
                        mt-8
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        py-3
                        rounded-lg
                        font-bold
                        transition
                        "

                    >

                        Proceed To Checkout

                    </button>

                </div>

                            </div>

        </div>

    );

};

export default Cart;
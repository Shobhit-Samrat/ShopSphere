import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import {
    FaStar,
    FaShoppingCart,
    FaHeart,
    FaRegHeart,
    FaTrash,
} from "react-icons/fa";

import RelatedProducts from "../../components/product/RelatedProducts";

import {
    fetchProductDetails,
} from "../../features/product/productThunk";

import {
    addCartItem,
} from "../../features/cart/cartThunk";

import {
    addWishlist,
    removeWishlist,
} from "../../features/wishlist/wishlistThunk";

import {
    createReview,
    removeReview,
} from "../../features/product/reviewThunk";

import RecentlyViewed from "../../components/product/RecentlyViewed";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // =============================
    // State
    // =============================

    const [quantity, setQuantity] = useState(1);

    const [selectedImage, setSelectedImage] = useState("");

    const [review, setReview] = useState({

        rating: 5,

        comment: "",

    });

    // =============================
    // Redux
    // =============================

    const {

        product,

        loading,

        error,

    } = useSelector(

        (state) => state.product

    );

    const {

        wishlist = [],

    } = useSelector(

        (state) => state.wishlist

    );

    const {

        user,

    } = useSelector(

        (state) => state.auth

    );

    // =============================
    // Load Product
    // =============================

    useEffect(() => {

        dispatch(fetchProductDetails(id));

    }, [dispatch, id]);

    // =============================
    // Default Selected Image
    // =============================

    useEffect(() => {

        if (product?.images?.length > 0) {

            setSelectedImage(product.images[0]);

        }

    }, [product]);

    // =============================
    // Recently Viewed
    // =============================

    useEffect(() => {

        if (!product?._id) return;

        let viewed =

            JSON.parse(

                localStorage.getItem("recentProducts")

            ) || [];

        viewed = viewed.filter(

            (item) => item !== product._id

        );

        viewed.unshift(product._id);

        viewed = viewed.slice(0, 10);

        localStorage.setItem(

            "recentProducts",

            JSON.stringify(viewed)

        );

    }, [product]);

    // =============================
    // Wishlist Check
    // =============================

    const isWishlisted = wishlist.some(

        (item) => item._id === product?._id

    );

    // =============================
    // Add To Cart
    // =============================

    const addToCartHandler = async () => {

        if (!localStorage.getItem("token")) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        const result = await dispatch(

            addCartItem({

                productId: product._id,

                quantity,

            })

        );

        if (addCartItem.fulfilled.match(result)) {

            toast.success("Added to Cart");

        } else {

            toast.error(result.payload);

        }

    };

    // =============================
    // Buy Now
    // =============================

    const buyNowHandler = async () => {

        if (!localStorage.getItem("token")) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        await dispatch(

            addCartItem({

                productId: product._id,

                quantity,

            })

        );

        navigate("/checkout");

    };

    // =============================
    // Wishlist
    // =============================

    const wishlistHandler = () => {

        if (!localStorage.getItem("token")) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        if (isWishlisted) {

            dispatch(

                removeWishlist(product._id)

            );

            toast.success(

                "Removed from Wishlist"

            );

        } else {

            dispatch(

                addWishlist(product._id)

            );

            toast.success(

                "Added to Wishlist"

            );

        }

    };

    // =============================
    // Submit Review
    // =============================

    const submitReview = async (e) => {

        e.preventDefault();

        if (!localStorage.getItem("token")) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        const result = await dispatch(

            createReview({

                productId: product._id,

                reviewData: review,

            })

        );

        if (createReview.fulfilled.match(result)) {

            toast.success("Review Added");

            dispatch(

                fetchProductDetails(id)

            );

            setReview({

                rating: 5,

                comment: "",

            });

        } else {

            toast.error(result.payload);

        }

    };

    // =============================
    // Delete Review
    // =============================

    const deleteReviewHandler = async (reviewId) => {

        const result = await dispatch(

            removeReview({

                productId: product._id,

                reviewId,

            })

        );

        if (removeReview.fulfilled.match(result)) {

            toast.success("Review Deleted");

            dispatch(

                fetchProductDetails(id)

            );

        } else {

            toast.error(result.payload);

        }

    };

    // =============================
    // Loading
    // =============================

    if (loading) {

        return (

            <h2 className="text-center text-3xl mt-20">

                Loading Product...

            </h2>

        );

    }

    if (error) {

        return (

            <h2 className="text-center text-red-600 text-2xl mt-20">

                {error}

            </h2>

        );

    }

    if (!product) return null;

    return ( <div className="max-w-7xl mx-auto px-5 py-10">

    <div className="grid md:grid-cols-2 gap-12">

        {/* ================= IMAGE GALLERY ================= */}

        <div className="flex gap-5">

            {/* Thumbnails */}

            <div className="flex flex-col gap-3">

                {product.images?.map((image, index) => (

                    <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        onClick={() => setSelectedImage(image)}
                        className={`
                            w-20
                            h-20
                            object-cover
                            rounded-lg
                            cursor-pointer
                            border-2
                            transition-all
                            duration-200
                            hover:scale-105
                            ${
                                selectedImage === image
                                    ? "border-blue-600"
                                    : "border-gray-300"
                            }
                        `}
                    />

                ))}

            </div>

            {/* Main Image */}

            <div className="flex-1 overflow-hidden rounded-xl">

                <img
                    src={
                        selectedImage ||
                        "https://via.placeholder.com/600"
                    }
                    alt={product.name}
                    className="
                        w-full
                        h-[500px]
                        object-cover
                        rounded-xl
                        shadow-lg
                        transition-transform
                        duration-300
                        hover:scale-105
                    "
                />

            </div>

        </div>

        {/* ================= PRODUCT DETAILS ================= */}

        <div>

            <div className="flex justify-between items-start">

                <h1 className="text-4xl font-bold">

                    {product.name}

                </h1>

                <button
                    onClick={wishlistHandler}
                    className="text-3xl"
                >

                    {

                        isWishlisted

                            ?

                            <FaHeart className="text-red-500" />

                            :

                            <FaRegHeart />

                    }

                </button>

            </div>

            <p className="text-gray-500 mt-4">

                Brand :

                <span className="font-semibold">

                    {" "}

                    {product.brand}

                </span>

            </p>

            <div className="flex items-center gap-2 mt-5">

                <FaStar className="text-yellow-500" />

                <span>

                    {product.rating?.toFixed(1) || 0}

                </span>

                <span className="text-gray-500">

                    (

                    {product.numReviews || 0}

                    {" "}Reviews)

                </span>

            </div>

            <h2 className="text-4xl font-bold text-blue-600 mt-6">

                ₹{product.price}

            </h2>

            <p className="mt-6 text-gray-700 leading-7">

                {product.description}

            </p>

            {

                product.stock > 0

                    ?

                    <p className="mt-5 text-green-600 font-bold">

                        In Stock

                    </p>

                    :

                    <p className="mt-5 text-red-600 font-bold">

                        Out of Stock

                    </p>

            }

            {/* Quantity */}

            <div className="flex items-center gap-5 mt-8">

                <button

                    onClick={() => {

                        if (quantity > 1)

                            setQuantity(quantity - 1);

                    }}

                    className="bg-gray-200 px-4 py-2 rounded"

                >

                    -

                </button>

                <span className="text-xl font-semibold">

                    {quantity}

                </span>

                <button

                    onClick={() => {

                        if (quantity < product.stock)

                            setQuantity(quantity + 1);

                    }}

                    className="bg-gray-200 px-4 py-2 rounded"

                >

                    +

                </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-8">

                <button

                    onClick={addToCartHandler}

                    disabled={product.stock === 0}

                    className="
                        flex
                        items-center
                        gap-3
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-8
                        py-3
                        rounded-lg
                        disabled:bg-gray-400
                    "

                >

                    <FaShoppingCart />

                    Add To Cart

                </button>

            </div>

            <button

                onClick={buyNowHandler}

                disabled={product.stock === 0}

                className="
                    w-full
                    mt-5
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-3
                    rounded-lg
                    font-semibold
                    disabled:bg-gray-400
                "

            >

                Buy Now

            </button>

        </div>

    </div>

    {/* ================= REVIEWS ================= */}

    <div className="mt-20">

        <h2 className="text-3xl font-bold mb-6">

            Customer Reviews

        </h2>
    
            {/* ================= REVIEW FORM ================= */}

        <form
            onSubmit={submitReview}
            className="border rounded-lg p-6 mb-10"
        >

            <select
                value={review.rating}
                onChange={(e) =>
                    setReview({
                        ...review,
                        rating: Number(e.target.value),
                    })
                }
                className="border p-3 rounded w-full"
            >

                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>

            </select>

            <textarea
                value={review.comment}
                onChange={(e) =>
                    setReview({
                        ...review,
                        comment: e.target.value,
                    })
                }
                placeholder="Write your review..."
                className="border p-3 rounded w-full mt-4"
                rows="4"
                required
            />

            <button
                type="submit"
                className="
                    mt-4
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-lg
                "
            >
                Submit Review
            </button>

        </form>

        {/* ================= REVIEW LIST ================= */}

        <div>

            {product.reviews?.length > 0 ? (

                product.reviews.map((item) => (

                    <div
                        key={item._id}
                        className="border rounded-lg p-5 mb-5"
                    >

                        <div className="flex justify-between">

                            <div>

                                <h3 className="font-bold text-lg">

                                    {item.name}

                                </h3>

                                <p className="text-yellow-500">

                                    ⭐ {item.rating}/5

                                </p>

                            </div>

                            {user &&
                                (
                                    user._id === item.user ||
                                    user._id === item.user?._id ||
                                    user.role === "admin"
                                ) && (

                                    <button
                                        onClick={() =>
                                            deleteReviewHandler(item._id)
                                        }
                                        className="
                                            text-red-600
                                            hover:text-red-700
                                        "
                                    >

                                        <FaTrash />

                                    </button>

                                )}

                        </div>

                        <p className="mt-4 text-gray-700">

                            {item.comment}

                        </p>

                    </div>

                ))

            ) : (

                <p className="text-gray-500">

                    No reviews yet.

                </p>

            )}

        </div>

    </div>

    {/* ================= RELATED PRODUCTS ================= */}

    <RelatedProducts
        category={product.category}
        currentProductId={product._id}
    />

    <RecentlyViewed
    currentProductId={product._id}
    />

</div>

);

};

export default ProductDetails;
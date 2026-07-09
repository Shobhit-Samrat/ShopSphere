import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/product/ProductCard";
import { fetchProducts } from "../../features/product/productThunk";
import RecentlyViewed from "../../components/product/RecentlyViewed";

const categories = [
    "All",
    "Mobiles",
    "Laptops",
    "Electronics",
    "Watches",
    "Shoes",
    "Fashion",
    "Bags",
    "Home",
    "Gaming",
    "Books",
];

const Home = () => {
    const dispatch = useDispatch();

    const {
        products,
        loading,
        error,
        totalPages,
        currentPage,
    } = useSelector((state) => state.product);

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(
            fetchProducts({
                keyword,
                page,
                category: category === "All" ? "" : category,
                sort,
            })
        );
    }, [dispatch, keyword, category, sort, page]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Hero Banner */}

            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-10 mb-10">

                <h1 className="text-5xl font-bold">
                    ShopSphere
                </h1>

                <p className="mt-4 text-lg">
                    Discover thousands of premium products at amazing prices.
                </p>

                <button className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                    Shop Now
                </button>

            </div>

            {/* Search + Sort */}

            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        setPage(1);
                    }}
                    className="flex-1 border rounded-xl p-3"
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded-xl p-3"
                >
                    <option value="newest">Newest</option>
                    <option value="price">Price Low → High</option>
                    <option value="-price">Price High → Low</option>
                    <option value="rating">Highest Rated</option>
                </select>

            </div>

            {/* Categories */}

            <div className="flex gap-3 overflow-x-auto mb-10">

                {categories.map((item) => (

                    <button
                        key={item}
                        onClick={() => {
                            setCategory(item);
                            setPage(1);
                        }}
                        className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                            category === item
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-blue-100"
                        }`}
                    >
                        {item}
                    </button>

                ))}

            </div>

            {/* Products */}

            {loading ? (

                <div className="text-center py-20 text-xl">
                    Loading Products...
                </div>

            ) : error ? (

                <div className="text-center text-red-600 py-20">
                    {error}
                </div>

            ) : products.length === 0 ? (

                <div className="text-center py-20">

                    <div className="text-6xl">
                        📦
                    </div>

                    <h2 className="text-2xl font-semibold mt-4">
                        No Products Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try changing search or filters.
                    </p>

                </div>

            ) : (

                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))}

                    </div>

                    {/* Pagination */}

                    <div className="flex justify-center gap-2 mt-10">

                        {Array.from(
                            { length: totalPages || 1 },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setPage(index + 1)
                                    }
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === index + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                    </div>

                </>

            )}

            <RecentlyViewed />


        </div>
    );
};


export default Home;
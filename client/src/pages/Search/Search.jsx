import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchProducts } from "../../features/product/productThunk";

const Search = () => {

    const { keyword } = useParams();

    const dispatch = useDispatch();

    const {
        searchResults,
        searchLoading,
    } = useSelector(
        (state) => state.product
    );

    useEffect(() => {

        dispatch(
            searchProducts(keyword)
        );

    }, [dispatch, keyword]);

    if (searchLoading) {

        return (

            <div className="text-center py-20 text-2xl">

                Searching Products...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-3xl font-bold mb-8">

                Search Results for "{keyword}"

            </h1>

            {searchResults.length === 0 ? (

                <h2 className="text-xl text-gray-500">

                    No Products Found

                </h2>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {searchResults.map((product) => (

                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="border rounded-xl shadow hover:shadow-lg transition p-4"
                        >

                            <img
                                src={
                                    product.images?.[0] ||
                                    "https://via.placeholder.com/300"
                                }
                                alt={product.name}
                                className="w-full h-56 object-cover rounded-lg"
                            />

                            <h2 className="font-bold mt-4 text-lg">

                                {product.name}

                            </h2>

                            <p className="text-blue-600 font-bold mt-2">

                                ₹{product.price}

                            </p>

                            <p className="text-gray-500 mt-2">

                                {product.brand}

                            </p>

                        </Link>

                    ))}

                </div>

            )}

        </div>

    );

};

export default Search;
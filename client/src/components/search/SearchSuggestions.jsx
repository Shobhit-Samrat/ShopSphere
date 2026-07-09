import { Link } from "react-router-dom";

const SearchSuggestions = ({
    keyword,
    loading,
    products = [],
    clearSearch,
}) => {

    if (!keyword.trim()) return null;

    return (

        <div
            className="
                absolute
                left-0
                right-0
                mt-2
                bg-white
                border
                rounded-lg
                shadow-xl
                z-50
                max-h-96
                overflow-y-auto
            "
        >

            {loading ? (

                <div className="p-4 text-center">

                    Searching...

                </div>

            ) : products.length === 0 ? (

                <div className="p-4 text-gray-500">

                    No products found

                </div>

            ) : (

                products.map((product) => (

                    <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        onClick={clearSearch}
                        className="
                            flex
                            items-center
                            gap-4
                            p-3
                            hover:bg-gray-100
                            transition
                        "
                    >

                        <img
                            src={
                                product.images?.[0] ||
                                "https://via.placeholder.com/60"
                            }
                            alt={product.name}
                            className="
                                w-14
                                h-14
                                object-cover
                                rounded
                            "
                        />

                        <div className="flex-1">

                            <h3 className="font-medium">

                                {product.name}

                            </h3>

                            <p className="text-blue-600 font-semibold">

                                ₹{product.price}

                            </p>

                        </div>

                    </Link>

                ))

            )}

        </div>

    );

};

export default SearchSuggestions;
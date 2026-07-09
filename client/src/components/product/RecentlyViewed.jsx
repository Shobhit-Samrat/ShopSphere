import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const RecentlyViewed = ({ currentProductId }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProducts = async () => {

            try {

                let ids = JSON.parse(
                    localStorage.getItem("recentProducts")
                ) || [];

                // Remove current product
                ids = ids.filter(
                    (id) => id !== currentProductId
                );

                // Keep only latest 10
                ids = ids.slice(0, 10);

                if (ids.length === 0) {

                    setProducts([]);
                    setLoading(false);
                    return;

                }

                const responses = await Promise.allSettled(

                    ids.map((id) =>
                        API.get(`/products/${id}`)
                    )

                );

                const validProducts = [];
                const validIds = [];

                responses.forEach((result, index) => {

                    if (result.status === "fulfilled") {

                        validProducts.push(
                            result.value.data.product
                        );

                        validIds.push(ids[index]);

                    }

                });

                // Remove deleted products from localStorage
                localStorage.setItem(
                    "recentProducts",
                    JSON.stringify(validIds)
                );

                setProducts(validProducts);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        loadProducts();

    }, [currentProductId]);

    if (loading) {

        return (

            <div className="mt-20">

                <h2 className="text-3xl font-bold mb-8">

                    Recently Viewed

                </h2>

                <p>Loading...</p>

            </div>

        );

    }

    if (products.length === 0) {

        return null;

    }

    return (

        <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">

                Recently Viewed

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {

                    products.map((product) => (

                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="border rounded-xl overflow-hidden hover:shadow-xl transition duration-300 bg-white"
                        >

                            <img
                                src={
                                    product.images?.length > 0
                                        ? product.images[0]
                                        : "https://via.placeholder.com/400x400?text=No+Image"
                                }
                                alt={product.name}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-4">

                                <h3 className="font-semibold line-clamp-2 min-h-[48px]">

                                    {product.name}

                                </h3>

                                <p className="text-blue-600 font-bold mt-2 text-lg">

                                    ₹{product.price}

                                </p>

                                <div className="flex justify-between items-center mt-2">

                                    <span className="text-yellow-500">

                                        ⭐ {product.rating?.toFixed(1)}

                                    </span>

                                    <span className="text-gray-500 text-sm">

                                        ({product.numReviews})

                                    </span>

                                </div>

                            </div>

                        </Link>

                    ))

                }

            </div>

        </div>

    );

};

export default RecentlyViewed;
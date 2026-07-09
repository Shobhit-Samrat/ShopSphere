import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import productService from "../../features/product/productService";

const RelatedProducts = ({ category, currentProductId }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!category) return;

        const loadProducts = async () => {

            try {

                setLoading(true);

                const data = await productService.getProducts({
                    category,
                });

                const filtered =
                    (data.products || []).filter(
                        product =>
                            product._id !== currentProductId
                    );

                setProducts(filtered);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadProducts();

    }, [category, currentProductId]);

    if (loading) return null;

    if (products.length === 0) return null;

    return (

        <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
                You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {products.slice(0, 4).map(product => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

        </div>

    );

};

export default RelatedProducts;
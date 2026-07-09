import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import ProductFilters from "../../components/product/ProductFilters";
import ProductSort from "../../components/product/ProductSort";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sort: "newest",
    page: 1,
    inStock: false,
  });

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(filters);

      setProducts(data.products);

      setError("");
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">

        <ProductSearch
          onSearch={(keyword) =>
            setFilters((prev) => ({
              ...prev,
              keyword,
              page: 1,
            }))
          }
        />

        <ProductSort
          value={filters.sort}
          onChange={(sort) =>
            setFilters((prev) => ({
              ...prev,
              sort,
            }))
          }
        />

      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        <div>

          <ProductFilters
            onFilter={(newFilters) =>
              setFilters((prev) => ({
                ...prev,
                ...newFilters,
                page: 1,
              }))
            }
          />

        </div>

        <div className="lg:col-span-3">

          {loading ? (
            <h2 className="text-xl">Loading...</h2>
          ) : error ? (
            <h2 className="text-red-600">{error}</h2>
          ) : (
            <ProductGrid
              products={products}
              onAddToCart={(product) =>
                console.log("Cart:", product)
              }
              onWishlist={(product) =>
                console.log("Wishlist:", product)
              }
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default Products;
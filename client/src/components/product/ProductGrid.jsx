import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  onAddToCart,
  onWishlist,
}) => {

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-80">
        <h2 className="text-2xl font-semibold text-gray-500">
          No Products Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-6
    "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onWishlist={onWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
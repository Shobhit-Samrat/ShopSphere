import { useSelector } from "react-redux";
import ProductGrid from "../../components/product/ProductGrid";

const Wishlist = () => {
  const { wishlist, loading } = useSelector(
    (state) => state.wishlist
  );

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Your Wishlist is Empty ❤️
        </h2>

        <p className="text-gray-500 mt-3">
          Save products you like here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist
      </h1>

      <ProductGrid products={wishlist} />
    </div>
  );
};

export default Wishlist;
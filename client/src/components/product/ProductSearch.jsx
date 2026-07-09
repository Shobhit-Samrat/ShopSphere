import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(keyword.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg transition"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default ProductSearch;
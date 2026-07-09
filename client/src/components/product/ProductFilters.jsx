import { useState } from "react";

const ProductFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    inStock: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow space-y-4">

      <h2 className="text-xl font-semibold">
        Filters
      </h2>

      <input
        name="category"
        placeholder="Category"
        value={filters.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="brand"
        placeholder="Brand"
        value={filters.brand}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="minPrice"
        placeholder="Minimum Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Maximum Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="rating"
        value={filters.rating}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Rating</option>
        <option value="4">4★ & Above</option>
        <option value="3">3★ & Above</option>
        <option value="2">2★ & Above</option>
        <option value="1">1★ & Above</option>
      </select>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="inStock"
          checked={filters.inStock}
          onChange={handleChange}
        />
        In Stock Only
      </label>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;
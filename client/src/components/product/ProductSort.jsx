const ProductSort = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-3"
    >
      <option value="newest">Newest</option>

      <option value="price">
        Price: Low to High
      </option>

      <option value="-price">
        Price: High to Low
      </option>

      <option value="rating">
        Highest Rated
      </option>
    </select>
  );
};

export default ProductSort;
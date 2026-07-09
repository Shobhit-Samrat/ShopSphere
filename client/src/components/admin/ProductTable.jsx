import ProductRow from "./ProductRow";

const ProductTable = ({ products }) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="p-4">Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map(product => (

                            <ProductRow
                                key={product._id}
                                product={product}
                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ProductTable;
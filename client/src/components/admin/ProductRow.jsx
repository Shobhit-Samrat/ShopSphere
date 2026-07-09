import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FaEdit, FaTrash } from "react-icons/fa";

import { deleteProduct } from "../../features/product/productThunk";

const ProductRow = ({ product }) => {

    const dispatch = useDispatch();

    const deleteHandler = () => {

        const confirmDelete = window.confirm(
            `Delete "${product.name}" ?`
        );

        if (!confirmDelete) return;

        dispatch(deleteProduct(product._id));

    };

    const image =
        product.images?.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/80";

    return (

        <tr className="border-t">

            <td className="p-4">

                <img
                    src={image}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                />

            </td>

            <td>{product.name}</td>

            <td>{product.category}</td>

            <td>₹{product.price}</td>

            <td>{product.stock}</td>

            <td>

                <div className="flex justify-center gap-5">

                    <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FaEdit />
                    </Link>

                    <button
                        onClick={deleteHandler}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FaTrash />
                    </button>

                </div>

            </td>

        </tr>

    );

};

export default ProductRow;
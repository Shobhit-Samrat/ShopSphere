import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../features/product/productThunk";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ProductTable from "../../components/admin/ProductTable";

const Products = () => {

    const dispatch = useDispatch();

    const { products, loading } = useSelector(
        state => state.product
    );

    useEffect(() => {

        dispatch(fetchProducts());

    }, [dispatch]);

    return (

        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold">

                        Products

                    </h1>

                    <Link
                        to="/admin/products/add"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                    >
                        Add Product
                    </Link>

                </div>

                {

                    loading

                        ?

                        <p>Loading...</p>

                        :

                        <ProductTable
                            products={products}
                        />

                }

            </div>

        </div>

    );

};

export default Products;
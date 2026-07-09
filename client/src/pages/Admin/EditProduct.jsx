import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchProductDetails,
    updateProduct,
    uploadProductImage,
} from "../../features/product/productThunk";

import {
    clearProductState,
} from "../../features/product/productSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";

const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        product,
        uploadedImage,
        loading,
        success,
    } = useSelector(state => state.product);

    const [form, setForm] = useState({

        name: "",

        description: "",

        price: "",

        category: "",

        brand: "",

        stock: "",

        images: [],

    });

    // Load Product

    useEffect(() => {

        dispatch(fetchProductDetails(id));

    }, [dispatch, id]);

    // Fill Form

    useEffect(() => {

        if (product) {

            setForm({

                name: product.name,

                description: product.description,

                price: product.price,

                category: product.category,

                brand: product.brand,

                stock: product.stock,

                images: product.images,

            });

        }

    }, [product]);

    // Image Upload

    useEffect(() => {

        if (uploadedImage) {

            setForm(prev => ({

                ...prev,

                images: [uploadedImage],

            }));

        }

    }, [uploadedImage]);

    // Success Redirect

    useEffect(() => {

        if (success) {

            dispatch(clearProductState());

            navigate("/admin/products");

        }

    }, [success, dispatch, navigate]);

    const changeHandler = e => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const uploadHandler = e => {

        if (!e.target.files[0]) return;

        dispatch(uploadProductImage(e.target.files[0]));

    };

    const submitHandler = e => {

        e.preventDefault();

        dispatch(updateProduct({

            id,

            productData: form,

        }));

    };

    return (

        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                <h1 className="text-4xl font-bold mb-8">

                    Edit Product

                </h1>

                <form
                    onSubmit={submitHandler}
                    className="bg-white rounded-xl shadow p-8 space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={changeHandler}
                        placeholder="Product Name"
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        rows="4"
                        name="description"
                        value={form.description}
                        onChange={changeHandler}
                        placeholder="Description"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={changeHandler}
                        placeholder="Price"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={changeHandler}
                        placeholder="Brand"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={changeHandler}
                        placeholder="Category"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={changeHandler}
                        placeholder="Stock"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadHandler}
                    />

                    {

                        form.images.length > 0 && (

                            <img
                                src={form.images[0]}
                                alt="Preview"
                                className="w-40 rounded-lg"
                            />

                        )

                    }

                    <button
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
                    >

                        {

                            loading

                                ? "Updating..."

                                : "Update Product"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

};

export default EditProduct;
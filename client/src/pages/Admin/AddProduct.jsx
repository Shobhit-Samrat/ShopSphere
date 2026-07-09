import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AddProduct = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({

        name: "",

        description: "",

        category: "",

        brand: "",

        price: "",

        originalPrice: "",

        discount: "",

        stock: "",

        weight: "",

        material: "",

        warranty: "",

        seller: "ShopSphere",

        delivery: "3-5 Days",

        colors: "",

        sizes: "",

        images: [],

        featured: false,

        bestSeller: false,

        newArrival: true,

        freeShipping: true,

    });

    // ======================================
    // Input Change Handler
    // ======================================

    const changeHandler = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    };

    // ======================================
    // Upload Images to Cloudinary
    // ======================================

    const uploadImage = async (e) => {

    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setUploading(true);

    try {

        const uploadedImages = [];

        for (const file of files) {

            const data = new FormData();

            data.append("image", file);

            const res = await API.post(

                "/products/upload",

                data,

                {

                    headers: {

                        "Content-Type": "multipart/form-data",

                    },

                }

            );

            uploadedImages.push(res.data.imageUrl);

        }

        setForm((prev) => ({

            ...prev,

            images: [

                ...prev.images,

                ...uploadedImages,

            ],

        }));

        toast.success(`${uploadedImages.length} image(s) uploaded successfully`);

    }

    catch (error) {

        console.error(error);

        toast.error("Image upload failed");

    }

    finally {

        setUploading(false);

    }

};

    // ======================================
    // Remove Uploaded Image
    // ======================================

    const removeImage = (index) => {

        setForm((prev) => ({

            ...prev,

            images: prev.images.filter(

                (_, i) => i !== index

            ),

        }));

    };

    // ======================================
    // Submit Product
    // ======================================

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const productData = {

                ...form,

                colors: form.colors

                    .split(",")

                    .map((color) => color.trim())

                    .filter(Boolean),

                sizes: form.sizes

                    .split(",")

                    .map((size) => size.trim())

                    .filter(Boolean),

            };

            await API.post(

                "/products",

                productData

            );

            toast.success("Product Added Successfully");

            navigate("/admin/products");

        }

        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to add product"

            );

        }

        finally {

            setLoading(false);

        }

    };

        return (

        <div className="flex">

            {/* Sidebar */}

            <AdminSidebar />

            {/* Main Content */}

            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Add Product

                </h1>

                <form

                    onSubmit={submitHandler}

                    className="bg-white rounded-xl shadow-lg p-8 space-y-6"

                >

                    {/* ================= Product Name ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Product Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={form.name}

                            onChange={changeHandler}

                            placeholder="Enter Product Name"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required

                        />

                    </div>

                    {/* ================= Description ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Description

                        </label>

                        <textarea

                            name="description"

                            value={form.description}

                            onChange={changeHandler}

                            rows="5"

                            placeholder="Enter Product Description"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required

                        />

                    </div>

                    {/* ================= Category ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Category

                        </label>

                        <select

                            name="category"

                            value={form.category}

                            onChange={changeHandler}

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required

                        >

                            <option value="">

                                Select Category

                            </option>

                            <option value="Mobiles">

                                Mobiles

                            </option>

                            <option value="Laptops">

                                Laptops

                            </option>

                            <option value="Electronics">

                                Electronics

                            </option>

                            <option value="Watches">

                                Watches

                            </option>

                            <option value="Shoes">

                                Shoes

                            </option>

                            <option value="Fashion">

                                Fashion

                            </option>

                            <option value="Bags">

                                Bags

                            </option>

                            <option value="Gaming">

                                Gaming

                            </option>

                            <option value="Home">

                                Home

                            </option>

                            <option value="Books">

                                Books

                            </option>

                        </select>

                    </div>

                    {/* ================= Brand ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Brand

                        </label>

                        <input

                            type="text"

                            name="brand"

                            value={form.brand}

                            onChange={changeHandler}

                            placeholder="Apple, Samsung, Nike..."

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                                        {/* ================= Price Section ================= */}

                    <div className="grid md:grid-cols-3 gap-4">

                        <div>

                            <label className="block font-semibold mb-2">

                                Selling Price (₹)

                            </label>

                            <input

                                type="number"

                                name="price"

                                value={form.price}

                                onChange={changeHandler}

                                placeholder="49999"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                required

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Original Price (₹)

                            </label>

                            <input

                                type="number"

                                name="originalPrice"

                                value={form.originalPrice}

                                onChange={changeHandler}

                                placeholder="59999"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Discount (%)

                            </label>

                            <input

                                type="number"

                                name="discount"

                                value={form.discount}

                                onChange={changeHandler}

                                placeholder="15"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                    </div>

                    {/* ================= Stock ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Stock Quantity

                        </label>

                        <input

                            type="number"

                            name="stock"

                            value={form.stock}

                            onChange={changeHandler}

                            placeholder="100"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required

                        />

                    </div>

                    {/* ================= Weight & Material ================= */}

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <label className="block font-semibold mb-2">

                                Weight

                            </label>

                            <input

                                type="text"

                                name="weight"

                                value={form.weight}

                                onChange={changeHandler}

                                placeholder="1.5 kg"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Material

                            </label>

                            <input

                                type="text"

                                name="material"

                                value={form.material}

                                onChange={changeHandler}

                                placeholder="Leather / Plastic / Metal"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                    </div>

                    {/* ================= Warranty & Seller ================= */}

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <label className="block font-semibold mb-2">

                                Warranty

                            </label>

                            <input

                                type="text"

                                name="warranty"

                                value={form.warranty}

                                onChange={changeHandler}

                                placeholder="1 Year"

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Seller

                            </label>

                            <input

                                type="text"

                                name="seller"

                                value={form.seller}

                                onChange={changeHandler}

                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                        </div>

                    </div>

                    {/* ================= Delivery ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Delivery Time

                        </label>

                        <input

                            type="text"

                            name="delivery"

                            value={form.delivery}

                            onChange={changeHandler}

                            placeholder="3-5 Days"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                                        {/* ================= Colors ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Available Colors

                        </label>

                        <input

                            type="text"

                            name="colors"

                            value={form.colors}

                            onChange={changeHandler}

                            placeholder="Black, White, Blue"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                        <p className="text-sm text-gray-500 mt-1">

                            Separate colors using commas.

                        </p>

                    </div>

                    {/* ================= Sizes ================= */}

                    <div>

                        <label className="block font-semibold mb-2">

                            Available Sizes

                        </label>

                        <input

                            type="text"

                            name="sizes"

                            value={form.sizes}

                            onChange={changeHandler}

                            placeholder="S, M, L, XL or 7, 8, 9"

                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                        <p className="text-sm text-gray-500 mt-1">

                            Separate sizes using commas.

                        </p>

                    </div>

                    {/* ================= Product Images ================= */}

                    <div>

                        <label className="block font-semibold mb-3">

                            Product Images

                        </label>

                        <input

                            type="file"

                            multiple

                            accept="image/*"

                            onChange={uploadImage}

                            className="w-full border rounded-lg p-3"

                        />

                        {

                            uploading && (

                                <p className="text-blue-600 mt-2">

                                    Uploading images...

                                </p>

                            )

                        }

                    </div>

                    {
    form.images.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {

                form.images.map((image, index) => (

                    <div
                        key={index}
                        className="relative"
                    >

                        <img

                            src={image}

                            alt="Product"

                            className="w-full h-40 object-cover rounded-lg"

                        />

                        <button

                            type="button"

                            onClick={() => removeImage(index)}

                            className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full"

                        >

                            ×

                        </button>

                    </div>

                ))

            }

        </div>

    )
}

                    {/* ================= Uploaded Images Preview ================= */}

                    {

                        form.images.length > 0 && (

                            <div>

                                <h3 className="font-semibold mb-4">

                                    Uploaded Images

                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    {

                                        form.images.map((image, index) => (

                                            <div

                                                key={index}

                                                className="relative"

                                            >

                                                <img

                                                    src={image}

                                                    alt={`Product ${index + 1}`}

                                                    className="

                                                    w-full

                                                    h-40

                                                    object-cover

                                                    rounded-lg

                                                    border

                                                    shadow

                                                    "

                                                />

                                                <button

                                                    type="button"

                                                    onClick={() => removeImage(index)}

                                                    className="

                                                    absolute

                                                    top-2

                                                    right-2

                                                    bg-red-600

                                                    hover:bg-red-700

                                                    text-white

                                                    w-8

                                                    h-8

                                                    rounded-full

                                                    font-bold

                                                    "

                                                >

                                                    ×

                                                </button>

                                            </div>

                                        ))

                                    }

                                </div>

                            </div>

                        )

                    }

                                        {/* ================= Product Options ================= */}

                    <div>

                        <h3 className="text-xl font-bold mb-4">

                            Product Options

                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                            <label className="flex items-center gap-2 cursor-pointer">

                                <input

                                    type="checkbox"

                                    name="featured"

                                    checked={form.featured}

                                    onChange={changeHandler}

                                    className="w-5 h-5"

                                />

                                <span>Featured</span>

                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">

                                <input

                                    type="checkbox"

                                    name="bestSeller"

                                    checked={form.bestSeller}

                                    onChange={changeHandler}

                                    className="w-5 h-5"

                                />

                                <span>Best Seller</span>

                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">

                                <input

                                    type="checkbox"

                                    name="newArrival"

                                    checked={form.newArrival}

                                    onChange={changeHandler}

                                    className="w-5 h-5"

                                />

                                <span>New Arrival</span>

                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">

                                <input

                                    type="checkbox"

                                    name="freeShipping"

                                    checked={form.freeShipping}

                                    onChange={changeHandler}

                                    className="w-5 h-5"

                                />

                                <span>Free Shipping</span>

                            </label>

                        </div>

                    </div>

                    {/* ================= Submit Button ================= */}

                    <div className="pt-6">

                        <button

                            type="submit"

                            disabled={loading || uploading}

                            className={`

                                w-full

                                py-4

                                rounded-xl

                                text-lg

                                font-semibold

                                text-white

                                transition

                                duration-300

                                ${

                                    loading || uploading

                                        ? "bg-gray-400 cursor-not-allowed"

                                        : "bg-blue-600 hover:bg-blue-700"

                                }

                            `}

                        >

                            {

                                uploading

                                    ? "Uploading Images..."

                                    : loading

                                    ? "Adding Product..."

                                    : "Add Product"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddProduct;
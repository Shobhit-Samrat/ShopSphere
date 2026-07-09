import API from "../../services/api";

// ======================================
// Get All Products
// ======================================

const getProducts = async (params = {}) => {

    const response = await API.get("/products", {
        params,
    });

    return response.data;

};

// ======================================
// Get Product By ID
// ======================================

const getProductById = async (id) => {

    const response = await API.get(`/products/${id}`);

    return response.data;

};

// ======================================
// Create Product
// ======================================

const createProduct = async (productData) => {

    const response = await API.post(
        "/products",
        productData
    );

    return response.data;

};

// ======================================
// Update Product
// ======================================

const updateProduct = async (id, productData) => {

    const response = await API.put(
        `/products/${id}`,
        productData
    );

    return response.data;

};

// ======================================
// Delete Product
// ======================================

const deleteProduct = async (id) => {

    const response = await API.delete(
        `/products/${id}`
    );

    return response.data;

};

// ======================================
// Upload Product Image
// ======================================

const uploadProductImage = async (imageFile) => {

    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await API.post(

        "/products/upload",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};

export const searchProducts = async (keyword) => {
    const response = await API.get(
        `/products?keyword=${keyword}`
    );

    return response.data;
};

const productService = {

    getProducts,

    getProductById,

    createProduct,

    updateProduct,

    deleteProduct,

    uploadProductImage,

    searchProducts,

};

export default productService;
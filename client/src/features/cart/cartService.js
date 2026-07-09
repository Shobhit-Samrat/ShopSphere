import API from "../../services/api";

// ======================================
// Get Cart
// ======================================

export const getCart = async () => {

    const response = await API.get("/cart");

    return response.data;

};

// ======================================
// Add Item To Cart
// ======================================

export const addToCart = async (
    productId,
    quantity = 1
) => {

    const response = await API.post("/cart", {

        productId,

        quantity,

    });

    return response.data;

};

// ======================================
// Update Cart Quantity
// ======================================

export const updateCartItem = async (
    productId,
    quantity
) => {

    const response = await API.put(

        `/cart/${productId}`,

        {

            quantity,

        }

    );

    return response.data;

};

// ======================================
// Remove Cart Item
// ======================================

export const removeCartItem = async (
    productId
) => {

    const response = await API.delete(

        `/cart/${productId}`

    );

    return response.data;

};

// ======================================
// Clear Entire Cart
// ======================================

export const clearCart = async () => {

    const response = await API.delete("/cart");

    return response.data;

};
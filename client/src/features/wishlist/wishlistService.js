import API from "../../services/api";

// ======================================
// Get Wishlist
// ======================================

const getWishlist = async () => {

    const response = await API.get("/wishlist");

    return response.data;

};

// ======================================
// Add To Wishlist
// ======================================

const addToWishlist = async (productId) => {

    const response = await API.post(

        "/wishlist",

        {
            productId,
        }

    );

    return response.data;

};

// ======================================
// Remove From Wishlist
// ======================================

const removeFromWishlist = async (productId) => {

    const response = await API.delete(

        `/wishlist/${productId}`

    );

    return response.data;

};

const wishlistService = {

    getWishlist,

    addToWishlist,

    removeFromWishlist,

};

export default wishlistService;
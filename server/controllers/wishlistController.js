const Wishlist = require("../models/Wishlist");

// =========================================
// Add Product to Wishlist
// =========================================
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        // Create wishlist if it doesn't exist
        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [],
            });
        }

        // Check if product already exists
        const alreadyExists = wishlist.products.some(
            (item) => item.toString() === productId
        );

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist",
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        await wishlist.populate("products");

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =========================================
// Get Logged-in User Wishlist
// =========================================
const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        }).populate("products");

        // Return empty wishlist if none exists
        if (!wishlist) {
            return res.status(200).json({
                success: true,
                wishlist: {
                    products: [],
                },
            });
        }

        res.status(200).json({
            success: true,
            wishlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =========================================
// Remove Product From Wishlist
// =========================================
const removeFromWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        wishlist.products = wishlist.products.filter(
            (item) => item.toString() !== req.params.productId
        );

        await wishlist.save();

        await wishlist.populate("products");

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};
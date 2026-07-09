const express = require("express");

const router = express.Router();

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} = require("../controllers/wishlistController");

const {
    protect,
} = require("../middleware/authMiddleware");

// ==========================
// Wishlist Routes
// ==========================

// Add Product to Wishlist
router.post("/", protect, addToWishlist);

// Get Logged-in User Wishlist
router.get("/", protect, getWishlist);

// Remove Product from Wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
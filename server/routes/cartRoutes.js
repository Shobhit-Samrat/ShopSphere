const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update the cart Quantity
router.put("/:productId", protect, updateCartQuantity);

// Delete from cart
router.delete("/:productId", protect, removeFromCart);

module.exports = router;
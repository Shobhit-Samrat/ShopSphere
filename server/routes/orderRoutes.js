const express = require("express");

const router = express.Router();

const {

    placeOrder,

    getMyOrders,

    getOrderById,

    getAllOrders,

    updateOrderStatus

} = require("../controllers/orderController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

// ==============================
// User Routes
// ==============================

// Place Order
router.post("/", protect, placeOrder);

// Get Logged-in User Orders
router.get("/myorders", protect, getMyOrders);

// ==============================
// Admin Routes
// ==============================

// Get All Orders
router.get(
    "/",
    protect,
    authorize("admin"),
    getAllOrders
);

// Update Order Request
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateOrderStatus
);

// ==============================
// Get Single Order
// Keep this LAST
// ==============================

router.get("/:id", protect, getOrderById);

module.exports = router;
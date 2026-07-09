const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    createProductReview,
    deleteProductReview
} = require("../controllers/productController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// =======================================
// Public Routes
// =======================================

// Get all products
router.get("/", getAllProducts);

// Upload Product Image (Admin)
// IMPORTANT: This route should come before any conflicting dynamic routes
router.post(
    "/upload",
    protect,
    authorize("admin"),
    upload.single("image"),
    uploadProductImage
);

// Create Product (Admin)
router.post(
    "/",
    protect,
    authorize("admin"),
    createProduct
);

// Get Single Product
router.get("/:id", getProductById);

// Update Product (Admin)
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateProduct
);

// Delete Product (Admin)
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);

// Add Review
router.post(
    "/:id/review",
    protect,
    createProductReview
);

// Delete Review
router.delete(
    "/:productId/review/:reviewId",
    protect,
    deleteProductReview
);

module.exports = router;
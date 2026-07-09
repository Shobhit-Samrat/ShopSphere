const Product = require("../models/Product");

// =======================================
// Create Product
// =======================================

const createProduct = async (req, res) => {

    try {

        const product = await Product.create({

            ...req.body,

            createdBy: req.user._id,

        });

        res.status(201).json({

            success: true,

            message: "Product created successfully",

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Get All Products
// Search
// Filter
// Sort
// Pagination
// =======================================

const getAllProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 12;

        const skip = (page - 1) * limit;

        const query = {};

        // =====================================
        // Search
        // =====================================

        if (req.query.keyword) {

            query.name = {

                $regex: req.query.keyword,

                $options: "i",

            };

        }

        // =====================================
        // Category
        // =====================================

        if (req.query.category) {

            query.category = req.query.category;

        }

        // =====================================
        // Brand
        // =====================================

        if (req.query.brand) {

            query.brand = req.query.brand;

        }

        // =====================================
        // Price Filter
        // =====================================

        if (req.query.minPrice || req.query.maxPrice) {

            query.price = {};

            if (req.query.minPrice) {

                query.price.$gte = Number(req.query.minPrice);

            }

            if (req.query.maxPrice) {

                query.price.$lte = Number(req.query.maxPrice);

            }

        }

        // =====================================
        // Discount Filter
        // =====================================

        if (req.query.discount) {

            query.discount = {

                $gte: Number(req.query.discount),

            };

        }

        // =====================================
        // Rating Filter
        // =====================================

        if (req.query.rating) {

            query.rating = {

                $gte: Number(req.query.rating),

            };

        }

        // =====================================
        // Featured
        // =====================================

        if (req.query.featured === "true") {

            query.featured = true;

        }

        // =====================================
        // Stock
        // =====================================

        if (req.query.inStock === "true") {

            query.stock = {

                $gt: 0,

            };

        }

        // =====================================
        // Color
        // =====================================

        if (req.query.color) {

            query.colors = req.query.color;

        }

        // =====================================
        // Size
        // =====================================

        if (req.query.size) {

            query.sizes = req.query.size;

        }

        // =====================================
        // Tags
        // =====================================

        if (req.query.tag) {

            query.tags = req.query.tag;

        }

        // =====================================
        // Sorting
        // =====================================

        let sort = {};

        switch (req.query.sort) {

            case "price":

                sort.price = 1;

                break;

            case "-price":

                sort.price = -1;

                break;

            case "rating":

                sort.rating = -1;

                break;

            case "discount":

                sort.discount = -1;

                break;

            case "name":

                sort.name = 1;

                break;

            case "oldest":

                sort.createdAt = 1;

                break;

            default:

                sort.createdAt = -1;

        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)

            .sort(sort)

            .skip(skip)

            .limit(limit);

        res.status(200).json({

            success: true,

            totalProducts,

            currentPage: page,

            totalPages: Math.ceil(totalProducts / limit),

            products,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Get Product By ID
// =======================================

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)

            .populate(

                "createdBy",

                "name email"

            );

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        res.status(200).json({

            success: true,

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Update Product
// =======================================

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        Object.assign(product, req.body);

        await product.save();

        res.status(200).json({

            success: true,

            message: "Product updated successfully",

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Delete Product
// =======================================

const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        await product.deleteOne();

        res.status(200).json({

            success: true,

            message: "Product deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Upload Product Image
// =======================================

const uploadProductImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please upload an image",

            });

        }

        res.status(200).json({

            success: true,

            message: "Image uploaded successfully",

            imageUrl: req.file.path,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Toggle Featured Product
// =======================================

const toggleFeaturedProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        product.featured = !product.featured;

        await product.save();

        res.status(200).json({

            success: true,

            message: `Product ${product.featured ? "marked as Featured" : "removed from Featured"}`,

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Update Product Stock
// =======================================

const updateStock = async (req, res) => {

    try {

        const { stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        product.stock = stock;

        await product.save();

        res.status(200).json({

            success: true,

            message: "Stock updated successfully",

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Helper Function
// Recalculate Product Rating
// =======================================

const calculateProductRating = (product) => {

    product.numReviews = product.reviews.length;

    if (product.reviews.length === 0) {

        product.rating = 0;

        return;

    }

    const totalRating = product.reviews.reduce(

        (sum, review) => sum + review.rating,

        0

    );

    product.rating = Number(

        (totalRating / product.reviews.length).toFixed(1)

    );

};

// =======================================
// Create / Update Review
// =======================================

const createProductReview = async (req, res) => {

    try {

        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        const existingReview = product.reviews.find(

            review =>

                review.user.toString() === req.user._id.toString()

        );

        if (existingReview) {

            existingReview.rating = Number(rating);

            existingReview.comment = comment;

        }

        else {

            product.reviews.push({

                user: req.user._id,

                name: req.user.name,

                rating: Number(rating),

                comment,

            });

        }

        calculateProductRating(product);

        await product.save();

        res.status(200).json({

            success: true,

            message: existingReview

                ? "Review updated successfully"

                : "Review added successfully",

            product,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Delete Review
// =======================================

const deleteProductReview = async (req, res) => {

    try {

        const product = await Product.findById(req.params.productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found",

            });

        }

        const review = product.reviews.id(req.params.reviewId);

        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found",

            });

        }

        if (

            review.user.toString() !== req.user._id.toString() &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied",

            });

        }

        product.reviews.pull(req.params.reviewId);

        calculateProductRating(product);

        await product.save();

        res.status(200).json({

            success: true,

            message: "Review deleted successfully",

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    createProduct,

    getAllProducts,

    getProductById,

    updateProduct,

    deleteProduct,

    uploadProductImage,

    toggleFeaturedProduct,

    updateStock,

    createProductReview,

    deleteProductReview,

};
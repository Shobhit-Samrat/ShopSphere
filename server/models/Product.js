const mongoose = require("mongoose");

// ======================================
// Review Schema
// ======================================

const reviewSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

},
{
    timestamps: true
}
);

// ======================================
// Product Schema
// ======================================

const productSchema = new mongoose.Schema(
{

    // Product Name
    name: {
        type: String,
        required: true
    },

    // Short Description
    description: {
        type: String,
        required: true
    },

    // Selling Price
    price: {
        type: Number,
        required: true
    },

    // Original Price (for discount display)
    originalPrice: {
        type: Number,
        default: 0
    },

    // Discount %
    discount: {
        type: Number,
        default: 0
    },

    // Product Category
    category: {
    type: String,
    required: true,
    enum: [
        "Mobiles",
        "Laptops",
        "Electronics",
        "Watches",
        "Shoes",
        "Fashion",
        "Bags",
        "Home",
        "Gaming",
        "Books"
    ]
},

    // Brand
    brand: {
        type: String,
        default: ""
    },

    // Stock
    stock: {
        type: Number,
        default: 0
    },

    // Multiple Images
    images: [
        {
            type: String
        }
    ],

    // Color Variants
    colors: [
        {
            type: String
        }
    ],

    // Size Variants
    sizes: [
        {
            type: String
        }
    ],

    // Weight
    weight: {
        type: String,
        default: ""
    },

    // Material
    material: {
        type: String,
        default: ""
    },

    // Warranty
    warranty: {
        type: String,
        default: ""
    },

    // Seller
    seller: {
        type: String,
        default: "ShopSphere"
    },

    // Delivery Time
    delivery: {
        type: String,
        default: "3-5 Days"
    },

    // Free Shipping
    freeShipping: {
        type: Boolean,
        default: true
    },

    // Featured Product
    featured: {
        type: Boolean,
        default: false
    },

    // Best Seller
    bestSeller: {
        type: Boolean,
        default: false
    },

    // New Arrival
    newArrival: {
        type: Boolean,
        default: true
    },

    // Product Reviews
    reviews: [
        reviewSchema
    ],

    // Average Rating
    rating: {
        type: Number,
        default: 0
    },

    // Total Reviews
    numReviews: {
        type: Number,
        default: 0
    },

    // User who added the product
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
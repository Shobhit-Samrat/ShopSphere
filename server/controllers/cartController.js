const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =======================================
// Add Product to Cart
// =======================================
const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        // Create new cart if not exists
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                cartItems: [],
                totalPrice: 0,
            });
        }

        // Check if product already exists in cart
        const itemIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Increase quantity
            cart.cartItems[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.cartItems.push({
                product: productId,
                quantity,
            });
        }

        // Calculate Total Price
        let total = 0;

        for (const item of cart.cartItems) {

            const currentProduct = await Product.findById(item.product);

            total += currentProduct.price * item.quantity;

        }

        cart.totalPrice = total;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// =======================================
// Get User Cart
// =======================================
const getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
        user: req.user._id
        }).populate("cartItems.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty",
            });
        }

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =======================================
// Update Cart Quantity
// =======================================
const updateCartQuantity = async (req, res) => {
    try {

        const { quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const item = cart.cartItems.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        item.quantity = quantity;

        let total = 0;

        for (const cartItem of cart.cartItems) {

            const product = await Product.findById(cartItem.product);

            total += product.price * cartItem.quantity;

        }

        cart.totalPrice = total;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================================
// Remove Item From Cart
// =======================================
const removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Remove the matching product
        cart.cartItems = cart.cartItems.filter(
            item => item.product.toString() !== productId
        );

        // Recalculate total price
        let total = 0;

        for (const item of cart.cartItems) {

            const product = await Product.findById(item.product);

            if (product) {
                total += product.price * item.quantity;
            }
        }

        cart.totalPrice = total;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
};
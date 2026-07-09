const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =========================================
// Place Order
// =========================================

const placeOrder = async (req, res) => {

    try {

        const {

            address,
            city,
            state,
            country,
            postalCode,
            paymentMethod

        } = req.body;

        // Find User Cart

        const cart = await Cart.findOne({ user: req.user._id })
            .populate("cartItems.product");

        if (!cart || cart.cartItems.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Cart is empty"

            });

        }

        // Calculate Prices

        const itemsPrice = cart.totalPrice;

        const shippingPrice = itemsPrice > 1000 ? 0 : 100;

        const taxPrice = Number((itemsPrice * 0.18).toFixed(2));

        const totalPrice =
            itemsPrice +
            shippingPrice +
            taxPrice;

        // Create Order

        const order = await Order.create({

            user: req.user._id,

            orderItems: cart.cartItems.map(item => ({

                product: item.product._id,

                name: item.product.name,

                image: item.product.images[0],

                price: item.product.price,

                quantity: item.quantity

            })),

            shippingAddress: {

                address,

                city,

                state,

                country,

                postalCode

            },

            paymentMethod,

            itemsPrice,

            shippingPrice,

            taxPrice,

            totalPrice

        });

        // Reduce Product Stock

        for (const item of cart.cartItems) {

            await Product.findByIdAndUpdate(

                item.product._id,

                {

                    $inc: {

                        stock: -item.quantity

                    }

                }

            );

        }

        // Clear Cart

        cart.cartItems = [];

        cart.totalPrice = 0;

        await cart.save();

        res.status(201).json({

            success: true,

            message: "Order placed successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Get Logged-in User Orders
// =========================================

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Get Single Order
// =========================================

const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "name email");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        // User can only view their own order
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Admin - Get All Orders
// =========================================

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const totalRevenue = orders.reduce(
            (acc, order) => acc + order.totalPrice,
            0
        );

        res.status(200).json({

            success: true,

            totalOrders: orders.length,

            totalRevenue,

            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================================
// Admin - Update Order Status
// =========================================

const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        // Prevent updating a delivered order
        if (order.orderStatus === "Delivered") {

            return res.status(400).json({

                success: false,

                message: "Order has already been delivered"

            });

        }

        order.orderStatus = orderStatus;

        // Automatically set delivery date
        if (orderStatus === "Delivered") {

            order.deliveredAt = Date.now();

            order.paymentStatus = "Paid";
        }

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order status updated successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    placeOrder,

    getMyOrders,

    getOrderById,

    getAllOrders,

    updateOrderStatus

};
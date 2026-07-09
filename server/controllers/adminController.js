const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ========================================
// Admin Dashboard
// ========================================

const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const revenue = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "Paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice",
                    },
                },
            },
        ]);

        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending",
        });

        const lowStockProducts = await Product.countDocuments({
            stock: {
                $lte: 5,
            },
        });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue:
                    revenue.length > 0
                        ? revenue[0].totalRevenue
                        : 0,
                pendingOrders,
                lowStockProducts,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getDashboardStats,
};
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// =======================================
// Create Razorpay Order
// =======================================

const createRazorpayOrder = async (req, res) => {

    try {

        const {
            amount,
            orderId
        } = req.body;

        if (!amount || !orderId) {

            return res.status(400).json({
                success: false,
                message: "Amount and Order ID are required",
            });

        }

        const options = {

            amount: amount * 100, // Convert ₹ to paise

            currency: "INR",

            receipt: orderId,

            notes: {
                orderId,
            },

        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({

            success: true,

            order: razorpayOrder,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Verify Payment
// =======================================

const verifyPayment = async (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            orderId,

        } = req.body;

        // Generate Signature

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        // Verify Signature

        if (expectedSignature !== razorpay_signature) {

            return res.status(400).json({

                success: false,

                message: "Payment verification failed",

            });

        }

        // Find Order

        const order = await Order.findById(orderId);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }

        // Save Payment Information

        order.paymentInfo = {

            id: razorpay_payment_id,

            status: "Paid",

        };

        // Update Payment Status

        order.paymentStatus = "Paid";

        // Save Payment Time

        order.paidAt = Date.now();

        await order.save();

        res.status(200).json({

            success: true,

            message: "Payment verified successfully",

            order,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =======================================
// Get Razorpay Public Key
// =======================================

const getRazorpayKey = (req, res) => {

    res.status(200).json({

        success: true,

        key: process.env.RAZORPAY_KEY_ID,

    });

};

module.exports = {

    createRazorpayOrder,

    verifyPayment,

    getRazorpayKey,

};
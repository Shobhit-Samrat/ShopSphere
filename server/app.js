const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// ===============================
// Allowed Origins
// ===============================

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

// ===============================
// Middlewares
// ===============================

app.use(
    cors({
        origin: (origin, callback) => {

            // Allow requests with no origin
            // (Postman, Render health checks, mobile apps)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS Error: ${origin} is not allowed`)
            );
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.send("Welcome to ShopSphere API");
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// ===============================
// 404 Route
// ===============================

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found",
    });
});

module.exports = app;
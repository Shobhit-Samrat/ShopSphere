require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");

const products = require("./products");

// ==========================
// Connect Database
// ==========================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

// ==========================
// Seed Products
// ==========================

const seedProducts = async () => {

    try {

        // Delete old products
        await Product.deleteMany();

        console.log("🗑 Old products deleted");

        // Insert new products
        await Product.insertMany(products);

        console.log("✅ Products inserted successfully");

        process.exit();

    }

    catch (error) {

        console.error(error);

        process.exit(1);

    }

};

seedProducts();
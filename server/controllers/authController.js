const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Validate Input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT Token
        const token = generateToken(user._id);

        // Response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validate Input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password"
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        // Response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const getUserProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

};

// ========================================
// Admin - Get All Users
// ========================================

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: users.length,

            users,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ========================================
// Admin - Update User Role
// ========================================

const updateUserRole = async (req, res) => {

    try {

        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        user.role = role;

        await user.save();

        res.status(200).json({

            success: true,

            message: "User role updated successfully",

            user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ========================================
// Admin - Delete User
// ========================================

const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        if (user._id.toString() === req.user._id.toString()) {

            return res.status(400).json({

                success: false,

                message: "You cannot delete your own account.",

            });

        }

        await user.deleteOne();

        res.status(200).json({

            success: true,

            message: "User deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ========================================
// Update User Profile
// ========================================

const updateUserProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        // Check if email is already used by another account
        if (email && email !== user.email) {

            const existingUser = await User.findOne({ email });

            if (existingUser) {

                return res.status(400).json({

                    success: false,

                    message: "Email already exists",

                });

            }

        }

        user.name = name || user.name;

        user.email = email || user.email;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                avatar: user.avatar,

            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ========================================
// Change Password
// ========================================

const changePassword = async (req, res) => {

    try {

        const {

            currentPassword,

            newPassword,

        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }

        const isMatch = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Current password is incorrect",

            });

        }

        user.password = await bcrypt.hash(

            newPassword,

            10

        );

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password updated successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    registerUser,

    loginUser,

    getUserProfile,

    updateUserProfile,

    changePassword,

    getAllUsers,

    updateUserRole,

    deleteUser,

};
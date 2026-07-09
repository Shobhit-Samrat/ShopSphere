const express = require("express");

const router = express.Router();

const {

    registerUser,

    loginUser,

    getUserProfile,

    updateUserProfile,

    changePassword,

    getAllUsers,

    updateUserRole,

    deleteUser,

} = require("../controllers/authController");

const {

    protect,

    authorize,

} = require("../middleware/authMiddleware");

// =====================================
// Public Routes
// =====================================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =====================================
// User Routes
// =====================================

router.get(
    "/profile",
    protect,
    getUserProfile
);

// =====================================
// Update Profile
// =====================================

router.put(

    "/profile",

    protect,

    updateUserProfile

);

// =====================================
// Change Password
// =====================================

router.put(

    "/change-password",

    protect,

    changePassword

);

// =====================================
// Admin Routes
// =====================================

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllUsers
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateUserRole
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);



module.exports = router;
const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    updateUserRole,
    deleteUser,
} = require("../controllers/authController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

// =====================================
// Admin - Get All Users
// =====================================

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllUsers
);

// =====================================
// Admin - Update User Role
// =====================================

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateUserRole
);

// =====================================
// Admin - Delete User
// =====================================

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);

module.exports = router;
import { Routes, Route } from "react-router-dom";

// ==============================
// Public Pages
// ==============================

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import NotFound from "../pages/NotFound/NotFound";

// ==============================
// User Pages
// ==============================

import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import Search from "../pages/Search/Search";
import EditProfile from "../pages/Profile/EditProfile";
import ChangePassword from "../pages/Profile/ChangePassword";

// ==============================
// Admin Pages
// ==============================

import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";
import AdminOrders from "../pages/Admin/Orders";
import Users from "../pages/Admin/Users";

// ==============================
// Protected Route
// ==============================

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/" element={<Home />} />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/product/:id"
                element={<ProductDetails />}
            />

            {/* ================= PROTECTED ROUTES ================= */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/payment"
                    element={<Payment />}
                />

                <Route
                    path="/payment-success"
                    element={<PaymentSuccess />}
                />

                <Route
                    path="/payment-failed"
                    element={<PaymentFailed />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                {/* ================= ADMIN ROUTES ================= */}

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/products"
                    element={<Products />}
                />

                <Route
                    path="/admin/products/add"
                    element={<AddProduct />}
                />

                <Route
                    path="/admin/products/edit/:id"
                    element={<EditProduct />}
                />

                <Route
                    path="/admin/orders"
                    element={<AdminOrders />}
                />

                <Route
                    path="/admin/users"
                    element={<Users />}
                />

                </Route>

                 <Route
                     path="/search/:keyword"
                     element={<Search />}
                />


                <Route
                      path="/profile/edit"
                      element={<EditProfile />}
                />

                <Route
                      path="/change-password"
                      element={<ChangePassword />}
                />

            {/* ================= 404 ================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;
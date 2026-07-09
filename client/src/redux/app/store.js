import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/authSlice";
import productReducer from "../../features/product/productSlice";
import cartReducer from "../../features/cart/cartSlice";
import wishlistReducer from "../../features/wishlist/wishlistSlice";
import orderReducer from "../../features/order/orderSlice";
import paymentReducer from "../../features/payment/paymentSlice";
import adminReducer from "../../features/admin/adminSlice";
import userReducer from "../../features/user/userSlice";
// import themeReducer from "./features/theme/themeSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        product: productReducer,

        cart: cartReducer,

        wishlist: wishlistReducer,

        order: orderReducer,

        payment: paymentReducer,

        admin: adminReducer,

        user: userReducer,

        // theme: themeReducer,

    },

    devTools: import.meta.env.DEV,

});
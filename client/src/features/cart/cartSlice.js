import { createSlice } from "@reduxjs/toolkit";

import {
    fetchCart,
    addCartItem,
    updateCartQuantity,
    removeCartItem,
} from "./cartThunk";

const initialState = {

    cart: null,

    loading: false,

    error: null,

};

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        clearCart(state) {

            state.cart = null;

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ======================================
        // Fetch Cart
        // ======================================

            .addCase(fetchCart.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchCart.fulfilled, (state, action) => {

                state.loading = false;

                state.cart = action.payload.cart;

            })

            .addCase(fetchCart.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Add Item
        // ======================================

            .addCase(addCartItem.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(addCartItem.fulfilled, (state, action) => {

                state.loading = false;

                state.cart = action.payload.cart;

            })

            .addCase(addCartItem.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Update Quantity
        // ======================================

            .addCase(updateCartQuantity.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(updateCartQuantity.fulfilled, (state, action) => {

                state.loading = false;

                state.cart = action.payload.cart;

            })

            .addCase(updateCartQuantity.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Remove Item
        // ======================================

            .addCase(removeCartItem.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(removeCartItem.fulfilled, (state, action) => {

                state.loading = false;

                state.cart = action.payload.cart;

            })

            .addCase(removeCartItem.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import {
    fetchWishlist,
    addWishlist,
    removeWishlist,
} from "./wishlistThunk";

const initialState = {

    wishlist: [],

    loading: false,

    error: null,

};

const wishlistSlice = createSlice({

    name: "wishlist",

    initialState,

    reducers: {

        clearWishlist(state) {

            state.wishlist = [];

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ======================================
        // Fetch Wishlist
        // ======================================

            .addCase(fetchWishlist.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchWishlist.fulfilled, (state, action) => {

                state.loading = false;

                state.wishlist =
                    action.payload.wishlist?.products || [];

            })

            .addCase(fetchWishlist.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Add Wishlist
        // ======================================

            .addCase(addWishlist.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(addWishlist.fulfilled, (state, action) => {

                state.loading = false;

                state.wishlist =
                    action.payload.wishlist?.products || [];

            })

            .addCase(addWishlist.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Remove Wishlist
        // ======================================

            .addCase(removeWishlist.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(removeWishlist.fulfilled, (state, action) => {

                state.loading = false;

                state.wishlist =
                    action.payload.wishlist?.products || [];

            })

            .addCase(removeWishlist.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
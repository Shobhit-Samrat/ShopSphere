import { createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

// ======================================
// Fetch Wishlist
// ======================================

export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, thunkAPI) => {

        try {

            return await wishlistService.getWishlist();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch wishlist"

            );

        }

    }
);

// ======================================
// Add To Wishlist
// ======================================

export const addWishlist = createAsyncThunk(
    "wishlist/addWishlist",
    async (productId, thunkAPI) => {

        try {

            return await wishlistService.addToWishlist(productId);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to add to wishlist"

            );

        }

    }
);

// ======================================
// Remove From Wishlist
// ======================================

export const removeWishlist = createAsyncThunk(
    "wishlist/removeWishlist",
    async (productId, thunkAPI) => {

        try {

            return await wishlistService.removeFromWishlist(productId);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to remove from wishlist"

            );

        }

    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "./cartService";

// ==============================
// Get Cart
// ==============================

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, thunkAPI) => {
        try {
            return await cartService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Add Item
// ==============================

export const addCartItem = createAsyncThunk(
    "cart/addCartItem",
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            return await cartService.addToCart(productId, quantity);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Update Quantity
// ==============================

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            return await cartService.updateCartItem(
                productId,
                quantity
            );
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Remove Item
// ==============================

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (productId, thunkAPI) => {
        try {
            return await cartService.removeCartItem(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
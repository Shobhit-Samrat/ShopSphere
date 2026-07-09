import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// ======================================
// Place Order
// ======================================

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (orderData, thunkAPI) => {

        try {

            return await orderService.placeOrder(orderData);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to place order"

            );

        }

    }
);

// ======================================
// Get My Orders
// ======================================

export const fetchMyOrders = createAsyncThunk(
    "order/fetchMyOrders",
    async (_, thunkAPI) => {

        try {

            return await orderService.getMyOrders();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch orders"

            );

        }

    }
);

// ======================================
// Get Order Details
// ======================================

export const fetchOrderById = createAsyncThunk(
    "order/fetchOrderById",
    async (orderId, thunkAPI) => {

        try {

            return await orderService.getOrderById(orderId);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch order"

            );

        }

    }
);
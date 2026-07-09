import { createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// ======================================
// Dashboard Statistics
// ======================================

export const fetchDashboardStats = createAsyncThunk(
    "admin/fetchDashboardStats",
    async (_, thunkAPI) => {

        try {

            return await adminService.getDashboardStats();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch dashboard statistics"

            );

        }

    }
);

// ======================================
// Get All Orders
// ======================================

export const fetchAllOrders = createAsyncThunk(
    "admin/fetchAllOrders",
    async (_, thunkAPI) => {

        try {

            return await adminService.getAllOrders();

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
// Update Order Status
// ======================================

export const changeOrderStatus = createAsyncThunk(
    "admin/changeOrderStatus",
    async ({ id, orderStatus }, thunkAPI) => {

        try {

            return await adminService.updateOrderStatus({
                id,
                orderStatus,
            });

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to update order status"

            );

        }

    }
);
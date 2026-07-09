import { createSlice } from "@reduxjs/toolkit";

import {
    fetchDashboardStats,
    fetchAllOrders,
    changeOrderStatus,
} from "./adminThunk";

const initialState = {

    // Dashboard Statistics
    stats: null,

    // Orders
    orders: [],

    // Common States
    loading: false,

    error: null,

};

const adminSlice = createSlice({

    name: "admin",

    initialState,

    reducers: {

        clearAdminState(state) {

            state.stats = null;

            state.orders = [];

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ======================================
        // Dashboard Statistics
        // ======================================

            .addCase(fetchDashboardStats.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchDashboardStats.fulfilled, (state, action) => {

                state.loading = false;

                state.stats = action.payload.stats || null;

            })

            .addCase(fetchDashboardStats.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Fetch All Orders
        // ======================================

            .addCase(fetchAllOrders.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchAllOrders.fulfilled, (state, action) => {

                state.loading = false;

                state.orders = action.payload.orders || [];

            })

            .addCase(fetchAllOrders.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Change Order Status
        // ======================================

            .addCase(changeOrderStatus.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(changeOrderStatus.fulfilled, (state, action) => {

                state.loading = false;

                state.orders = state.orders.map((order) =>

                    order._id === action.payload.order?._id
                        ? action.payload.order
                        : order

                );

            })

            .addCase(changeOrderStatus.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {
    clearAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;
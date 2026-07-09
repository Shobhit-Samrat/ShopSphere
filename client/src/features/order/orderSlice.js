import { createSlice } from "@reduxjs/toolkit";

import {
    placeOrder,
    fetchMyOrders,
    fetchOrderById,
} from "./orderThunk";

const initialState = {

    shippingAddress: null,

    currentOrder: null,

    myOrders: [],

    selectedOrder: null,

    loading: false,

    error: null,

};

const orderSlice = createSlice({

    name: "order",

    initialState,

    reducers: {

        // ======================================
        // Save Shipping Address
        // ======================================

        saveShippingAddress(state, action) {

            state.shippingAddress = action.payload;

        },

        // ======================================
        // Clear Current Order
        // ======================================

        clearCurrentOrder(state) {

            state.currentOrder = null;

            state.selectedOrder = null;

        },

        // ======================================
        // Clear Entire Order State
        // ======================================

        clearOrderState(state) {

            state.shippingAddress = null;

            state.currentOrder = null;

            state.myOrders = [];

            state.selectedOrder = null;

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ======================================
        // Place Order
        // ======================================

            .addCase(placeOrder.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(placeOrder.fulfilled, (state, action) => {

                state.loading = false;

                state.currentOrder = action.payload.order;

            })

            .addCase(placeOrder.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Fetch My Orders
        // ======================================

            .addCase(fetchMyOrders.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchMyOrders.fulfilled, (state, action) => {

                state.loading = false;

                state.myOrders = action.payload.orders || [];

            })

            .addCase(fetchMyOrders.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Fetch Order Details
        // ======================================

            .addCase(fetchOrderById.pending, (state) => {

                state.loading = true;

                state.error = null;

                state.selectedOrder = null;

            })

            .addCase(fetchOrderById.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedOrder = action.payload.order;

            })

            .addCase(fetchOrderById.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {

    saveShippingAddress,

    clearCurrentOrder,

    clearOrderState,

} = orderSlice.actions;

export default orderSlice.reducer;
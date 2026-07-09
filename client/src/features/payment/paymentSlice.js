import { createSlice } from "@reduxjs/toolkit";

import {
    fetchRazorpayKey,
    createPaymentOrder,
    verifyPayment,
} from "./paymentThunk";

const initialState = {

    // Razorpay Public Key
    razorpayKey: "",

    // Razorpay Order
    razorpayOrder: null,

    // Payment Status
    paymentSuccess: false,

    // Loading
    loading: false,

    // Error
    error: null,

};

const paymentSlice = createSlice({

    name: "payment",

    initialState,

    reducers: {

        // ======================================
        // Reset Payment State
        // ======================================

        resetPayment(state) {

            state.razorpayKey = "";

            state.razorpayOrder = null;

            state.paymentSuccess = false;

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ======================================
        // Fetch Razorpay Key
        // ======================================

            .addCase(fetchRazorpayKey.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchRazorpayKey.fulfilled, (state, action) => {

                state.loading = false;

                state.razorpayKey = action.payload.key;

            })

            .addCase(fetchRazorpayKey.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Create Payment Order
        // ======================================

            .addCase(createPaymentOrder.pending, (state) => {

                state.loading = true;

                state.error = null;

                state.paymentSuccess = false;

                state.razorpayOrder = null;

            })

            .addCase(createPaymentOrder.fulfilled, (state, action) => {

                state.loading = false;

                state.razorpayOrder = action.payload.order;

            })

            .addCase(createPaymentOrder.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // ======================================
        // Verify Payment
        // ======================================

            .addCase(verifyPayment.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(verifyPayment.fulfilled, (state) => {

                state.loading = false;

                state.paymentSuccess = true;

            })

            .addCase(verifyPayment.rejected, (state, action) => {

                state.loading = false;

                state.paymentSuccess = false;

                state.error = action.payload;

            });

    },

});

export const {

    resetPayment,

} = paymentSlice.actions;

export default paymentSlice.reducer;
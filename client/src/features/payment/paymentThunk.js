import { createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";

// ======================================
// Get Razorpay Public Key
// ======================================

export const fetchRazorpayKey = createAsyncThunk(
    "payment/getKey",
    async (_, thunkAPI) => {

        try {

            return await paymentService.getRazorpayKey();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch Razorpay key"

            );

        }

    }
);

// ======================================
// Create Razorpay Order
// ======================================

export const createPaymentOrder = createAsyncThunk(
    "payment/createOrder",
    async ({ amount, orderId }, thunkAPI) => {

        try {

            return await paymentService.createRazorpayOrder(
                amount,
                orderId
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to create payment order"

            );

        }

    }
);

// ======================================
// Verify Payment
// ======================================

export const verifyPayment = createAsyncThunk(
    "payment/verify",
    async (paymentData, thunkAPI) => {

        try {

            return await paymentService.verifyPayment(
                paymentData
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Payment verification failed"

            );

        }

    }
);
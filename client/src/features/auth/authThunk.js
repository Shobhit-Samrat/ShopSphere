import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// ==============================
// Register User
// ==============================

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.registerUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Login User
// ==============================

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.loginUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Get Profile
// ==============================

export const fetchProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (_, thunkAPI) => {
        try {
            return await authService.getProfile();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ==============================
// Update Profile
// ==============================

export const updateProfile = createAsyncThunk(

    "auth/updateProfile",

    async (userData, thunkAPI) => {

        try {

            return await authService.updateProfile(userData);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message ||

                "Failed to update profile"

            );

        }

    }

);

// ==============================
// Change Password
// ==============================

export const changePassword = createAsyncThunk(

    "auth/changePassword",

    async (passwordData, thunkAPI) => {

        try {

            return await authService.changePassword(passwordData);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message ||

                "Failed to change password"

            );

        }

    }

);
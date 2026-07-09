import { createSlice } from "@reduxjs/toolkit";

import {
    loginUser,
    registerUser,
    fetchProfile,
    updateProfile,
    changePassword,
} from "./authThunk";

const initialState = {

    user:
        JSON.parse(localStorage.getItem("user")) || null,

    token:
        localStorage.getItem("token") || null,

    isAuthenticated:
        !!localStorage.getItem("token"),

    loading: false,

    error: null,

};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        // ==========================
        // Logout
        // ==========================

        logout: (state) => {

            state.user = null;

            state.token = null;

            state.isAuthenticated = false;

            state.loading = false;

            state.error = null;

            localStorage.removeItem("token");

            localStorage.removeItem("user");

        },

        // ==========================
        // Clear Error
        // ==========================

        clearAuthError: (state) => {

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // ==========================
        // REGISTER
        // ==========================

        .addCase(registerUser.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(registerUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;

            state.token = action.payload.token;

            state.isAuthenticated = true;

            localStorage.setItem(
                "token",
                action.payload.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

        })

        .addCase(registerUser.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ==========================
        // LOGIN
        // ==========================

        .addCase(loginUser.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;

            state.token = action.payload.token;

            state.isAuthenticated = true;

            localStorage.setItem(
                "token",
                action.payload.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

        })

        .addCase(loginUser.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ==========================
        // FETCH PROFILE
        // ==========================

        .addCase(fetchProfile.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchProfile.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

        })

        .addCase(fetchProfile.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ==========================
        // UPDATE PROFILE
        // ==========================

        .addCase(updateProfile.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(updateProfile.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );

        })

        .addCase(updateProfile.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ==========================
        // CHANGE PASSWORD
        // ==========================

        .addCase(changePassword.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(changePassword.fulfilled, (state) => {

            state.loading = false;

        })

        .addCase(changePassword.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    },

});

export const {

    logout,

    clearAuthError,

} = authSlice.actions;

export default authSlice.reducer;
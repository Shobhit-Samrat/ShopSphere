import { createSlice } from "@reduxjs/toolkit";

import {

    fetchUsers,

    updateUserRole,

    removeUser,

} from "./userThunk";

const initialState = {

    users: [],

    loading: false,

    error: null,

};

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // ==========================
            // Fetch Users
            // ==========================

            .addCase(fetchUsers.pending, (state) => {

                state.loading = true;

            })

            .addCase(fetchUsers.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload.users;

                state.error = null;

            })

            .addCase(fetchUsers.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            // ==========================
            // Update User Role
            // ==========================

            .addCase(updateUserRole.pending, (state) => {

                state.loading = true;

            })

            .addCase(updateUserRole.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload.users;

            })

            .addCase(updateUserRole.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            // ==========================
            // Delete User
            // ==========================

            .addCase(removeUser.pending, (state) => {

                state.loading = true;

            })

            .addCase(removeUser.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload.users;

            })

            .addCase(removeUser.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export default userSlice.reducer;
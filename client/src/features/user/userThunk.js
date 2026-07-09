import { createAsyncThunk } from "@reduxjs/toolkit";

import userService from "./userService";

// ======================================
// Fetch Users
// ======================================

export const fetchUsers = createAsyncThunk(

    "user/fetchUsers",

    async (_, thunkAPI) => {

        try {

            return await userService.getUsers();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ======================================
// Update User Role
// ======================================

export const updateUserRole = createAsyncThunk(

    "user/updateRole",

    async ({ id, role }, thunkAPI) => {

        try {

            await userService.updateRole(id, role);

            return await userService.getUsers();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ======================================
// Delete User
// ======================================

export const removeUser = createAsyncThunk(

    "user/deleteUser",

    async (id, thunkAPI) => {

        try {

            await userService.deleteUser(id);

            return await userService.getUsers();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);
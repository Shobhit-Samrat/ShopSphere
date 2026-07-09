import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    addReview,
    deleteReview
} from "./reviewService";



// Add Review

export const createReview = createAsyncThunk(

    "product/createReview",

    async(
        {
            productId,
            reviewData
        },
        thunkAPI
    )=>{

        try{

            return await addReview(
                productId,
                reviewData
            );

        }

        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );

        }

    }

);






// Delete Review


export const removeReview = createAsyncThunk(

    "product/removeReview",

    async(
        {
            productId,
            reviewId
        },
        thunkAPI
    )=>{


        try{

            return await deleteReview(
                productId,
                reviewId
            );

        }

        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );

        }


    }

);
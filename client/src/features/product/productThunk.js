import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

// ======================================
// Get All Products
// ======================================

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (params = {}, thunkAPI) => {

        try {

            return await productService.getProducts(params);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch products"

            );

        }

    }
);

// ======================================
// Get Product Details
// ======================================

export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id, thunkAPI) => {

        try {

            return await productService.getProductById(id);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to fetch product"

            );

        }

    }
);

// ======================================
// Create Product
// ======================================

export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (productData, thunkAPI) => {

        try {

            return await productService.createProduct(productData);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to create product"

            );

        }

    }
);

// ======================================
// Update Product
// ======================================

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, productData }, thunkAPI) => {

        try {

            return await productService.updateProduct(
                id,
                productData
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to update product"

            );

        }

    }
);

// ======================================
// Delete Product
// ======================================

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, thunkAPI) => {

        try {

            await productService.deleteProduct(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to delete product"

            );

        }

    }
);

// ======================================
// Upload Product Image
// ======================================

export const uploadProductImage = createAsyncThunk(
    "product/uploadProductImage",
    async (imageFile, thunkAPI) => {

        try {

            return await productService.uploadProductImage(imageFile);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||
                error.message ||
                "Failed to upload image"

            );

        }

    }
);

export const searchProducts = createAsyncThunk(
    "product/searchProducts",

    async (keyword, thunkAPI) => {

        try {

            return await productService.searchProducts(keyword);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);
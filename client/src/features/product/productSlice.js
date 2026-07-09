import { createSlice } from "@reduxjs/toolkit";

import {
    fetchProducts,
    fetchProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    searchProducts,
} from "./productThunk";

import {
    createReview,
    removeReview
} from "./reviewThunk";

const initialState = {

    products: [],

    product: null,

    loading: false,

    error: null,

    success: false,

    uploadedImage: "",

    totalPages: 1,

    currentPage: 1,

    totalProducts: 0,

    searchResults: [],

    searchLoading: false,

};

const productSlice = createSlice({

    name: "product",

    initialState,

    reducers: {

        clearProductState: (state) => {

            state.loading = false;

            state.error = null;

            state.success = false;

            state.uploadedImage = "";

        },

        clearSelectedProduct: (state) => {

            state.product = null;

        },

    },

    extraReducers: (builder) => {

        builder

        // =====================================
        // Fetch Products
        // =====================================

            .addCase(fetchProducts.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchProducts.fulfilled, (state, action) => {

                state.loading = false;

                state.products = action.payload.products || [];

                state.totalPages = action.payload.totalPages || 1;

                state.currentPage = action.payload.currentPage || 1;

                state.totalProducts = action.payload.totalProducts || 0;

            })

            .addCase(fetchProducts.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(createReview.fulfilled,(state,action)=>{

                state.product =
                action.payload.product;

               })


            .addCase(removeReview.fulfilled,(state,action)=>{

             state.product =
             action.payload.product;

            })

        // =====================================
        // Product Details
        // =====================================

            .addCase(fetchProductDetails.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchProductDetails.fulfilled, (state, action) => {

                state.loading = false;

                state.product = action.payload.product;

            })

            .addCase(fetchProductDetails.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // =====================================
        // Create Product
        // =====================================

            .addCase(createProduct.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(createProduct.fulfilled, (state, action) => {

                state.loading = false;

                state.success = true;

                state.products.unshift(action.payload.product);

            })

            .addCase(createProduct.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // =====================================
        // Update Product
        // =====================================

            .addCase(updateProduct.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(updateProduct.fulfilled, (state, action) => {

                state.loading = false;

                state.success = true;

                state.product = action.payload.product;

                state.products = state.products.map((product) =>

                    product._id === action.payload.product._id
                        ? action.payload.product
                        : product

                );

            })

            .addCase(updateProduct.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // =====================================
        // Delete Product
        // =====================================

            .addCase(deleteProduct.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(deleteProduct.fulfilled, (state, action) => {

                state.loading = false;

                state.success = true;

                state.products = state.products.filter(

                    (product) => product._id !== action.payload

                );

            })

            .addCase(deleteProduct.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

        // =====================================
        // Upload Image
        // =====================================

            .addCase(uploadProductImage.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(uploadProductImage.fulfilled, (state, action) => {

                state.loading = false;

                state.uploadedImage = action.payload.imageUrl;

            })

            .addCase(uploadProductImage.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            
            // =====================================
// Search Products
// =====================================

.addCase(searchProducts.pending, (state) => {

    state.searchLoading = true;

})

.addCase(searchProducts.fulfilled, (state, action) => {

    state.searchLoading = false;

    state.searchResults = action.payload.products || [];

})

.addCase(searchProducts.rejected, (state, action) => {

    state.searchLoading = false;

    state.error = action.payload;

});

    },

});

export const {

    clearProductState,

    clearSelectedProduct,

} = productSlice.actions;

export default productSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../Actions/ProductActions";

export const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        error: null,
        loading: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // ✅ Manual update reducer add kiya
        updateProductInState: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex(
                product => product._id === updatedProduct._id || product.id === updatedProduct.id
            );
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...updatedProduct };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Products
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Products API Response:', action.payload);

                if (Array.isArray(action.payload)) {
                    state.products = action.payload;
                } else if (action.payload.data && Array.isArray(action.payload.data)) {
                    state.products = action.payload.data;
                } else if (action.payload.products && Array.isArray(action.payload.products)) {
                    state.products = action.payload.products;
                } else {
                    state.products = [];
                    console.warn('Unexpected API response structure:', action.payload);
                }
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.products = [];
            })

            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Create Product Response:', action.payload);

                const newProduct = action.payload.data || action.payload.product || action.payload;
                if (newProduct) {
                    state.products.push(newProduct);
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Update Product Response:', action.payload);

                const updatedProduct = action.payload.data || action.payload.product || action.payload;
                if (updatedProduct) {
                    const index = state.products.findIndex(
                        product => product._id === updatedProduct._id || product.id === updatedProduct.id
                    );
                    if (index !== -1) {
                        state.products[index] = { ...state.products[index], ...updatedProduct };
                    }
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Delete fulfilled payload:', action.payload);
                console.log('Delete meta arg:', action.meta.arg);

                const deletedId = action.meta.arg;
                state.products = state.products.filter(
                    product => product._id !== deletedId && product.id !== deletedId
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const { clearError, updateProductInState } = productSlice.actions;
export default productSlice.reducer;

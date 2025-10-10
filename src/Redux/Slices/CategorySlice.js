import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategory, deleteCategory, updateCategory } from "../Actions/CategoryAction";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [], // ✅ products سے categories میں تبدیل کریں
        error: null,
        loading: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Categories
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Categories API Response:', action.payload);

                if (Array.isArray(action.payload)) {
                    state.categories = action.payload; // ✅ products سے categories میں تبدیل کریں
                } else if (action.payload.data && Array.isArray(action.payload.data)) {
                    state.categories = action.payload.data;
                } else if (action.payload.categories && Array.isArray(action.payload.categories)) {
                    state.categories = action.payload.categories;
                } else {
                    state.categories = [];
                    console.warn('Unexpected API response structure:', action.payload);
                }
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.categories = [];
            })

            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Create Category Response:', action.payload);

                const newCategory = action.payload.data || action.payload.category || action.payload;
                if (newCategory) {
                    state.categories.push(newCategory); // ✅ products سے categories میں تبدیل کریں
                }
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Update Category Response:', action.payload);

                const updatedCategory = action.payload.data || action.payload.category || action.payload;
                if (updatedCategory) {
                    const index = state.categories.findIndex( // ✅ products سے categories میں تبدیل کریں
                        category => category._id === updatedCategory._id || category.id === updatedCategory.id
                    );
                    if (index !== -1) {
                        state.categories[index] = { ...state.categories[index], ...updatedCategory };
                    }
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                console.log('Deleting category with ID:', deletedId);
                console.log('Current categories before deletion:', state.categories);

                // ✅ _id کے ساتھ filter کریں کیونکہ آپ کے data میں _id ہے
                state.categories = state.categories.filter(
                    category => category._id !== deletedId
                );

                console.log('Categories after deletion:', state.categories);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('Delete category rejected:', action.payload);
            });
    },
})

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;


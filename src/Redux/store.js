import {configureStore} from "@reduxjs/toolkit"
import productReducer  from "../Redux/Slices/ProductSlice"
import userReducer  from "../Redux/Slices/AuthSlice"
import categoryReducer from '../Redux/Slices/CategorySlice'

export const store = configureStore({
    reducer :{
        user : userReducer,
        product:productReducer,
        category:categoryReducer
    }
})
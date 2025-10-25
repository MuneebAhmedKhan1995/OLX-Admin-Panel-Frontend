import { createAsyncThunk } from "@reduxjs/toolkit";


export const createProduct = createAsyncThunk('createProduct', async (data, { rejectWithValue }) => {
    try {
        console.log("Sending data to backend...");
        
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/user/product', {
            method: "POST",
            body: data, // FormData - headers nahi chahiye
            credentials: 'include'
        });

        console.log("Response status:", response.status);
        
        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        // ✅ Check if response is HTML error page
        if (responseText.includes('<!DOCTYPE html>') || responseText.includes('<html>')) {
            console.error("❌ Backend returned HTML error page");
            
            // Backend server check karne ke liye message
            return rejectWithValue({
                status: 0,
                message: "Backend server error - Check backend console",
                error: "HTML Error Page Received"
            });
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error("❌ JSON Parse Error:", parseError);
            return rejectWithValue({
                status: 0,
                message: "Invalid response from server",
                error: "JSON Parse Error"
            });
        }

        console.log("Processed Result:", result);
        
        if (!response.ok) {
            return rejectWithValue(result);
        }
        
        return result;
    } catch (error) {
        console.error("❌ Network Error:", error);
        return rejectWithValue({
            status: 0,
            message: error.message,
            error: "Network error"
        });
    }
});



// AuthActions.js - getAllProducts update karo
export const getAllProducts = createAsyncThunk('getProducts', async (data, { rejectWithValue }) => {
    try {
        // Cookies ke through hi call karo, Bearer token nahi
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/user/products', { // Path change karo
            method: 'GET',
            credentials: 'include', // Cookies ke liye important
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json()
        console.log("Products response:", result)
        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// export const deleteProduct = createAsyncThunk('deleteProduct', async (id, { rejectWithValue }) => {
//   try {
//     // Get token from cookies
//     const getToken = () => {
//         return document.cookie
//             .split('; ')
//             .find(row => row.startsWith('token='))
//             ?.split('=')[1];
//     };

//     const token = getToken();
    
//     const response = await fetch(`https://olx-admin-panel-backend.vercel.app/user/products/${id}`, {
//       method: 'DELETE',
//       headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//       }
//     })
    
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const result = await response.json()
//     console.log('Delete API Response:', result)
//     // return result
//     return { ...result, deletedId: id }
//   } catch (error) {
//     return rejectWithValue(error.message)
//   }
// });

// // ✅ Correct Action
// export const updateProduct = createAsyncThunk(
//   'updateProduct', 
//   async ({ id, updateData }, { rejectWithValue }) => { // ✅ Object destructure karo
//     try {
//       // Get token from cookies
//       const getToken = () => {
//         return document.cookie
//           .split('; ')
//           .find(row => row.startsWith('token='))
//           ?.split('=')[1];
//       };

//       const token = getToken();
      
//       console.log('Updating product:', id, updateData);
      
//       const response = await fetch(`https://olx-admin-panel-backend.vercel.app/user/products/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateData)
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Server Error:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log('Update API Response:', result);
//       return result;
      
//     } catch (error) {
//       console.error('Update API Error:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const deleteProduct = createAsyncThunk('deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://olx-admin-panel-backend.vercel.app/user/products/${id}`, {
      method: 'DELETE',
      credentials: 'include', // ✅ Cookies use karo
      headers: {
          'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('Delete API Response:', result)
    return { ...result, deletedId: id }
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

// ✅ UPDATE API ko bhi cookies mein change karo
export const updateProduct = createAsyncThunk(
  'updateProduct', 
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      console.log('Updating product:', id, updateData);
      
      const response = await fetch(`https://olx-admin-panel-backend.vercel.app/user/products/${id}`, {
        method: 'PUT',
        credentials: 'include', // ✅ Cookies use karo
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Update API Response:', result);
      return result;
      
    } catch (error) {
      console.error('Update API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);
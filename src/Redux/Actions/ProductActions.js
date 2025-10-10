import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProduct = createAsyncThunk('createProduct', async (data, { rejectWithValue }) => {
    try {
        console.log("Sending data:", data);
        
        const response = await fetch('http://localhost:3002/user/product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        // ✅ Pehle text mein response lo
        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        let result;
        try {
            // ✅ Phir JSON parse try karo
            result = JSON.parse(responseText);
        } catch (parseError) {
            // ✅ Agar JSON nahi hai, toh manual object banao
            if (response.ok) {
                result = {
                    status: 1,
                    message: responseText,
                    data: null
                };
            } else {
                result = {
                    status: 0,
                    message: responseText,
                    error: "Invalid JSON response"
                };
            }
        }

        console.log("Processed Result:", result);
        
        if (!response.ok) {
            return rejectWithValue(result);
        }
        
        return result;
    } catch (error) {
        // ✅ Better error handling
        const errorObj = {
            status: 0,
            message: error.message,
            error: "Network error"
        };
        return rejectWithValue(errorObj);
    }
});


export const getAllProducts = createAsyncThunk('getProducts', async (data, { rejectWithValue }) => {
    try {
        // Get token from cookies
        const getToken = () => {
            return document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
        };

        const token = getToken();
        
        const response = await fetch('http://localhost:3002/user/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (id, { rejectWithValue }) => {
  try {
    // Get token from cookies
    const getToken = () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
    };

    const token = getToken();
    
    const response = await fetch(`http://localhost:3002/user/products/${id}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('Delete API Response:', result)
    // return result
    return { ...result, deletedId: id }
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

// ✅ Correct Action
export const updateProduct = createAsyncThunk(
  'updateProduct', 
  async ({ id, updateData }, { rejectWithValue }) => { // ✅ Object destructure karo
    try {
      // Get token from cookies
      const getToken = () => {
        return document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
      };

      const token = getToken();
      
      console.log('Updating product:', id, updateData);
      
      const response = await fetch(`http://localhost:3002/user/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
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
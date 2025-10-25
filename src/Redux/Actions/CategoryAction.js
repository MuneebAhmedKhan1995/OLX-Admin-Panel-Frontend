import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk('createCategory', async (data, { rejectWithValue }) => {
    try {
        console.log("Sending data:", data);
        
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/category', {
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


export const getAllCategory = createAsyncThunk('getCategory', async (data, { rejectWithValue }) => {
    try {
        // Get token from cookies
        const getToken = () => {
            return document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
        };

        const token = getToken();
        
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/categorys', {
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



export const deleteCategory = createAsyncThunk('deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const getToken = () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
    };

    const token = getToken();
    
    console.log('Sending DELETE request for ID:', id); // ✅ Debug log
    
    const response = await fetch(`https://olx-admin-panel-backend.vercel.app/category/${id}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    })
    
    console.log('DELETE response status:', response.status); // ✅ Debug log
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('DELETE error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json()
    console.log('Delete API Success Response:', result)
    
    // ✅ صرف ID return کریں کیونکہ slice میں hum ID سے filter kar rahe hain
    return id;
    
  } catch (error) {
    console.error('Delete category error:', error);
    return rejectWithValue(error.message)
  }
});

// ✅ Correct Action
export const updateCategory = createAsyncThunk(
  'updateCategory', 
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
      
      const response = await fetch(`https://olx-admin-panel-backend.vercel.app/category/${id}`, {
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
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('registerUser', async (data, { rejectWithValue }) => {
    try {
        console.log(data,)
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body:JSON.stringify(data),
        }
        )
        if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


// export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
//     try {
//         console.log("Sending data:", data);
//         const response = await fetch('https://olx-admin-panel-backend.vercel.app/signIn', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: 'include',
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         console.log("Backend response:", result);

//         if (!response.ok || result.status === 0) {
//             return rejectWithValue(result);
//         }

//         return result;

//     } catch (error) {
//         console.error("Network error:", error);
//         return rejectWithValue({ 
//             message: "Network error", 
//             error: error.message 
//         });
//     }
// });

export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
    try {
        console.log("Sending data:", data);
        
        // Step 1: Login Request
        const loginResponse = await fetch('https://olx-admin-panel-backend.vercel.app/signIn', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        const loginResult = await loginResponse.json();
        console.log("Login response:", loginResult);

        if (!loginResponse.ok || loginResult.status === 0) {
            return rejectWithValue(loginResult);
        }

        // Step 2: Get User Profile using auth/me
        if (loginResult.status === 1) {
            const profileResponse = await fetch('https://olx-admin-panel-backend.vercel.app/auth/me', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loginResult.token || loginResult.data?.token}` // Adjust based on your response
                },
                credentials: 'include'
            });

            const profileData = await profileResponse.json();
            console.log("Profile response:", profileData);

            if (profileResponse.ok && profileData.status === 1) {
                return {
                    ...loginResult,
                    userProfile: profileData.data // Include profile data in response
                };
            }
        }

        return loginResult;

    } catch (error) {
        console.error("Network error:", error);
        return rejectWithValue({ 
            message: "Network error", 
            error: error.message 
        });
    }
});

export const logoutUser = createAsyncThunk('logoutUser', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            credentials : 'include',
        }
        )
        if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
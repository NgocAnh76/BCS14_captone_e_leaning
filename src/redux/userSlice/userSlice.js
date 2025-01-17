// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { localService } from "../../api/localService";

// Fetch user profile từ API
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localService.getAccessToken();
      const response = await fetch(
        "https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localService.setUser(action.payload);
    },
    clearUser(state) {
      state.user = null;
      localService.clearUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        localService.setUser(action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

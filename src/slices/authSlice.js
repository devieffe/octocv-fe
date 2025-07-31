import { createSlice } from "@reduxjs/toolkit";

let isStaff = false;
try {
  const stored = localStorage.getItem("is_staff");
  isStaff = stored ? JSON.parse(stored) : false;
} catch (e) {
  console.warn("Invalid is_staff value in localStorage:", e);
  isStaff = false;
}

const initialState = {
  user: null,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  isAuthenticated: !!localStorage.getItem("access_token"),
  isStaff,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isStaff = user?.is_staff;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      localStorage.setItem("is_staff", JSON.stringify(user?.is_staff));
    },
    login: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      state.accessToken = action.payload.accessToken; 
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isStaff = user?.is_staff;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      localStorage.setItem("is_staff", JSON.stringify(user?.is_staff));
    },
    setPassedTests: (state, action) => {
      state.passedTests = action.payload;
    },    
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isStaff = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("is_staff");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;

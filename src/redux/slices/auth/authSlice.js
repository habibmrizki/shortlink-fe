import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  },
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      const { token, user } = data.results;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user, message: data.message };
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  },
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn("Logout notification failed:", err);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  },
);

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  user: getInitialUser(),
  isAuthenticated: Boolean(token),
  isLoading: false,
  isError: false,
  errorMessage: null,
  isSuccess: false,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.isSuccess = false;
      state.successMessage = null;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.isSuccess = false;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
        state.successMessage = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.successMessage =
          action.payload.message || "User registered successfully";
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Login
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutAction.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.isSuccess = false;
        state.successMessage = null;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;

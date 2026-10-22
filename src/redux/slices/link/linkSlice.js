import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:2901/api";

export const getLinksAction = createAsyncThunk(
  "link/getLinks",
  async (
    { page = 1, limit = 10, show_deleted = false } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        show_deleted: String(show_deleted),
      });

      const response = await fetch(`${API_BASE_URL}/links?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch links");
      }

      return data.results;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

export const createLinkAction = createAsyncThunk(
  "link/createLink",
  async ({ original_url, custom_slug }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const body = { original_url };
      if (custom_slug && custom_slug.trim()) {
        body.custom_slug = custom_slug.trim();
      }

      const response = await fetch(`${API_BASE_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create link");
      }

      return data.results;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

export const deleteLinkAction = createAsyncThunk(
  "link/deleteLink",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/links/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete link");
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

export const checkSlugAction = createAsyncThunk(
  "link/checkSlug",
  async (slug, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/links/check?slug=${encodeURIComponent(slug)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Invalid slug");
      }

      return {
        slug,
        available: data.results?.available ?? false,
        message: data.message,
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to check slug");
    }
  }
);

const initialState = {
  links: [],
  pagination: {
    page: 1,
    limit: 10,
    total_items: 0,
    total_pages: 1,
  },
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isCheckingSlug: false,
  slugStatus: {
    checkedSlug: "",
    available: null,
    message: "",
  },
  error: null,
  successMessage: null,
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    resetLinkStatus: (state) => {
      state.error = null;
      state.successMessage = null;
      state.slugStatus = {
        checkedSlug: "",
        available: null,
        message: "",
      };
    },
    resetSlugStatus: (state) => {
      state.slugStatus = {
        checkedSlug: "",
        available: null,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // getLinksAction
      .addCase(getLinksAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLinksAction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.data) {
          state.links = action.payload.data;
          state.pagination = action.payload.pagination;
        } else if (Array.isArray(action.payload)) {
          state.links = action.payload;
          state.pagination = {
            page: 1,
            limit: action.payload.length,
            total_items: action.payload.length,
            total_pages: 1,
          };
        }
      })
      .addCase(getLinksAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // createLinkAction
      .addCase(createLinkAction.pending, (state) => {
        state.isCreating = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createLinkAction.fulfilled, (state, action) => {
        state.isCreating = false;
        state.links.unshift(action.payload);
        state.pagination.total_items += 1;
        state.successMessage = "Link created successfully!";
      })
      .addCase(createLinkAction.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      })
      // deleteLinkAction
      .addCase(deleteLinkAction.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteLinkAction.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.links = state.links.filter((l) => l.id !== action.payload);
        state.pagination.total_items = Math.max(
          0,
          state.pagination.total_items - 1
        );
        state.successMessage = "Link deleted successfully";
      })
      .addCase(deleteLinkAction.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })
      // checkSlugAction
      .addCase(checkSlugAction.pending, (state) => {
        state.isCheckingSlug = true;
      })
      .addCase(checkSlugAction.fulfilled, (state, action) => {
        state.isCheckingSlug = false;
        state.slugStatus = {
          checkedSlug: action.payload.slug,
          available: action.payload.available,
          message: action.payload.message,
        };
      })
      .addCase(checkSlugAction.rejected, (state, action) => {
        state.isCheckingSlug = false;
        state.slugStatus = {
          checkedSlug: "",
          available: false,
          message: action.payload,
        };
      });
  },
});

export const { resetLinkStatus, resetSlugStatus } = linkSlice.actions;
export default linkSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Artisan } from '@/types';
import { mockApi } from '@/lib/mock-api';

interface ArtisansState {
  items: Artisan[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedArtisan: Artisan | null;
}

const initialState: ArtisansState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
  selectedArtisan: null,
};

export const fetchArtisans = createAsyncThunk(
  'artisans/fetchArtisans',
  async (params: { page: number; limit?: number; search?: string; trade?: string }) => {
    const response = await mockApi.getArtisans(params.page, params.limit, params.search, params.trade);
    return response;
  }
);

export const fetchArtisanById = createAsyncThunk(
  'artisans/fetchArtisanById',
  async (id: string) => {
    const response = await mockApi.getArtisanById(id);
    return response;
  }
);

const artisansSlice = createSlice({
  name: 'artisans',
  initialState,
  reducers: {
    clearSelectedArtisan(state) {
      state.selectedArtisan = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtisans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtisans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchArtisans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch artisans';
      })
      .addCase(fetchArtisanById.fulfilled, (state, action) => {
        state.selectedArtisan = action.payload || null;
      });
  },
});

export const { clearSelectedArtisan } = artisansSlice.actions;
export default artisansSlice.reducer;

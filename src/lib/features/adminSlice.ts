import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsData } from '@/types';
import { mockApi } from '@/lib/mock-api';

interface AdminState {
  analytics: AnalyticsData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AdminState = {
  analytics: [],
  status: 'idle',
};

export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async () => {
    const response = await mockApi.getAnalytics();
    return response;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.analytics = action.payload;
      });
  },
});

export default adminSlice.reducer;
